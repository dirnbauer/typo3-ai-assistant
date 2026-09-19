import { useId, useState, type KeyboardEvent } from 'react';
import { CircleHelpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { PendingInput } from '@/state/types';

/**
 * A clarifying question, answered in place.
 *
 * Questionnaire style: the options are choices with letter shortcuts, one
 * keystroke each; free text sits below them when the run allows it. The answer
 * travels with the turn digest the question was rendered from, so a stale card
 * is refused by the server rather than fed into a turn the user never saw.
 */
export type InputCardProps = {
  input: PendingInput;
  busy: boolean;
  onAnswer: (answer: string) => void;
};

const LETTERS = 'ABCDEFGHIJ';

export function InputCard({ input, busy, onAnswer }: InputCardProps) {
  const [choice, setChoice] = useState<string | null>(null);
  const [text, setText] = useState('');
  const headingId = useId();
  const answer = choice ?? text.trim();

  const submit = () => {
    if (answer !== '' && !busy) {
      onAnswer(answer);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target instanceof HTMLTextAreaElement) {
      if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
        event.preventDefault();
        submit();
      }

      return;
    }
    const index = LETTERS.indexOf(event.key.toUpperCase());
    const option = input.options[index];
    if (option !== undefined && event.key.length === 1) {
      event.preventDefault();
      setChoice(option);
    }
  };

  return (
    <section
      aria-labelledby={headingId}
      className="sui-enter rounded-md border border-info/50 bg-info/5"
      onKeyDown={onKeyDown}
    >
      <header className="flex items-start gap-2 px-3 py-2.5">
        <CircleHelpIcon className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="font-semibold" id={headingId}>
            The assistant needs one more thing
          </h3>
          <p className="mt-0.5 text-[length:var(--text-read)] leading-relaxed">{input.question}</p>
        </div>
      </header>

      {input.options.length === 0 ? null : (
        <>
          <Separator />
          <div aria-label="Options" className="flex flex-col gap-1 px-3 py-2" role="radiogroup">
            {input.options.map((option, index) => {
              const selected = choice === option;

              return (
                <button
                  aria-checked={selected}
                  className={cn(
                    'flex items-center gap-2.5 rounded-md border px-2.5 py-2 text-start transition-colors',
                    selected ? 'border-primary bg-primary/10' : 'border-border hover:bg-accent/60',
                  )}
                  disabled={busy}
                  key={option}
                  onClick={() => setChoice(selected ? null : option)}
                  role="radio"
                  type="button"
                >
                  <Kbd className={cn(selected && 'bg-primary text-primary-foreground')}>{LETTERS[index]}</Kbd>
                  <span className="min-w-0 flex-1">{option}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {input.allowFreeText ? (
        <>
          <Separator />
          <div className="px-3 py-2">
            <Textarea
              aria-label="Your answer"
              className="min-h-14 resize-none text-[length:var(--text-read)]"
              disabled={busy || choice !== null}
              onChange={(event) => setText(event.currentTarget.value)}
              placeholder={choice === null ? 'Type an answer…' : 'An option is selected. Unselect it to type instead.'}
              value={text}
            />
          </div>
        </>
      ) : null}

      <Separator />
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <span className="text-muted-foreground">
          {input.options.length > 0 ? 'Press a letter to choose.' : 'Enter sends, Shift+Enter is a new line.'}
        </span>
        <Button disabled={busy || answer === ''} onClick={submit} size="sm">
          Answer
        </Button>
      </div>
    </section>
  );
}
