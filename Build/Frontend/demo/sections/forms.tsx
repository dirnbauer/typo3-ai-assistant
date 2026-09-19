import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { ui } from '@webconsulting/shadcn-ui/runtime.js';
import { Example, Section, type SectionProps } from '../frame';
import { LANGUAGES, REDIRECT_STATUSES } from '../fixtures';

const {
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  toast,
} = ui;

export function FormsSection({ group }: SectionProps) {
  const [source, setSource] = useState('/old-team');
  const [target, setTarget] = useState('/about/team');
  const [status, setStatus] = useState('301');
  const [respectQuery, setRespectQuery] = useState(false);
  const [active, setActive] = useState(true);
  const sourceError = source.startsWith('/') ? null : 'The source path has to start with a slash.';

  return (
    <Section group={group}>
      <Example title="Create a redirect" wide>
        <form
          className="max-w-xl"
          onSubmit={(event) => {
            event.preventDefault();
            if (sourceError === null) {
              toast.success('Redirect created', { description: `${source} → ${target} (${status})` });
            }
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Redirect</FieldLegend>
              <FieldDescription>Visitors of the source path are sent to the target.</FieldDescription>
              <FieldGroup>
                <Field data-invalid={sourceError !== null || undefined}>
                  <FieldLabel htmlFor="demo-source">Source path</FieldLabel>
                  <Input
                    aria-invalid={sourceError !== null}
                    id="demo-source"
                    onChange={(event) => setSource(event.currentTarget.value)}
                    value={source}
                  />
                  {sourceError === null ? (
                    <FieldDescription>Relative to the site root, without the domain.</FieldDescription>
                  ) : (
                    <FieldError>{sourceError}</FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="demo-target">Target</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>t3://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput id="demo-target" onChange={(event) => setTarget(event.currentTarget.value)} value={target} />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton aria-label="Browse pages" size="icon-xs">
                        <SearchIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="demo-status">Status code</FieldLabel>
                    <Select onValueChange={setStatus} value={status}>
                      <SelectTrigger className="w-full" id="demo-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REDIRECT_STATUSES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="demo-language">Language</FieldLabel>
                    <Select defaultValue="0">
                      <SelectTrigger className="w-full" id="demo-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field orientation="horizontal">
                  <Checkbox checked={respectQuery} id="demo-query" onCheckedChange={(checked) => setRespectQuery(checked === true)} />
                  <FieldLabel className="font-normal" htmlFor="demo-query">
                    Respect query parameters
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Switch checked={active} id="demo-active" onCheckedChange={setActive} />
                  <FieldLabel className="font-normal" htmlFor="demo-active">
                    {active ? 'Active' : 'Disabled'}
                  </FieldLabel>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Create redirect</Button>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Example>

      <Example title="Textarea with a counter">
        <div className="space-y-2">
          <Label htmlFor="demo-abstract">Abstract</Label>
          <Textarea
            className="field-sizing-content min-h-20"
            defaultValue="The team behind the site — who does what, and how to reach them."
            id="demo-abstract"
            maxLength={160}
          />
          <p className="text-muted-foreground">Shown in search results and social previews. Up to 160 characters.</p>
        </div>
      </Example>

      <Example title="Disabled and read-only">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="demo-uid">Record uid</Label>
            <Input defaultValue="12" id="demo-uid" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-locked">Slug (locked by a redirect)</Label>
            <Input defaultValue="/about/team" disabled id="demo-locked" />
          </div>
        </div>
      </Example>
    </Section>
  );
}
