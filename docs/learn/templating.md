---
title: templating
template: base.html
hide:
  - navigation
---

# Templating docsible readme with jinja2

Docsible fully supports jinja2 templating so you can customize your documentation to match your project's style and requirements.

This guide covers:

- How templating works in docsible
- The data model available in your templates
- How to create custom layouts
- Practical examples and best practices

---

## Template Basics

To use a custom template with docsible, pass your jinja2-compliant markdown file using the `--md-template` flag. For example:

```bash
docsible --role ./my_role --md-template ./template.md
```

Your template file uses standard jinja2 syntax, and docsible injects variables from your ansible role (or collection) into the markdown output.

---

## Data Model

In your template, you have access to a rich object called `role` when documenting a role, or `collection` if working with collections.

For a role, you might use:

```jinja2
{{ role.name }}
{{ role.meta.galaxy_info.description }}
{{ role.defaults }}
{{ role.vars }}
{{ role.tasks }}
```

For a collection, these objects are available:

```jinja2
{{ collection.name }}
{{ collection.namespace }}
{{ roles }}  {# A list of role objects within the collection #}
```

### Role Object Details

| Field                 | Type   | Description                                                     |
|-----------------------|--------|-----------------------------------------------------------------|
| `role.name`           | string | The name of the role                                            |
| `role.meta`           | dict   | Metadata from `meta/main.yml`                                   |
| `role.defaults`       | list   | Parsed content from defaults files (e.g. `defaults/*.yml`)        |
| `role.vars`           | list   | Parsed content from vars files (e.g. `vars/*.yml`)                |
| `role.tasks`          | list   | List of tasks with details like module, conditions, and comments  |
| `role.argument_specs` | dict   | Content of `argument_specs.yml`, if available                     |
| `role.playbook`       | object | Optional playbook details including content and mermaid graph     |
| `role.docsible`       | dict   | Additional custom metadata from the .docsible file                |

### Variable Objects

Each variable from defaults or vars includes:

- **Value**: Default or assigned value
- **Line**: Original file line number
- **Description**: Additional details or tooltip text
- **Title**: Short summary used in tables
- **Required**: Indicates if the variable is required
- **Choices**: List of valid options (if any)

### Task Objects

Each task object contains:

- **Name**: Task name
- **Module**: Module used in the task
- **When**: Conditions for task execution (or `null` if none)
- **Comments**: Associated inline comments

---

## Custom Examples

Here is an example of looping over default variables in your template:

```jinja2
### Defaults

{% for file in role.defaults %}
#### File: defaults/{{ file.file }}
| Var | Value | Description |
|-----|-------|-------------|
{% for var, data in file.data.items() %}
| {{ var }} | `{{ data.value }}` | {{ data.description | default('') }} |
{% endfor %}

{% endfor %}
```

You can also loop over tasks as shown here:

```jinja2
### Tasks

{% for task in role.tasks %}
- **{{ task.name }}** (module: {{ task.module }})
{% if task.when %}
  - Conditions: {{ task.when | join(', ') }}
{% endif %}
{% if task.comments %}
  - Comments: {{ task.comments | join(' ') }}
{% endif %}
{% endfor %}
```

---

## Mermaid Graphs

If you run docsible with the `--graph` flag and provide a playbook, a mermaid diagram is generated and available as:

```jinja2
{{ role.playbook.graph }}
```

To include it in your documentation, wrap it in a code block like so:

````markdown
```mermaid
{{ role.playbook.graph }}
```
````

This renders a mermaid diagram representing your playbook flow.

---

## Collections Support

If you are documenting a collection, the following variables are available:

- `collection.namespace`
- `collection.name`
- `collection.version`
- `collection.authors`
- `collection.description`
- `roles`: A list of role objects

Example for collections:

```jinja2
{% for role in roles %}
### {{ role.name }}
{{ role.meta.galaxy_info.description }}
{% endfor %}
```

---

## Best Practices

To get the most out of your custom templates:

- Avoid hardcoding values; use dynamic variables (e.g. `{{ variable }}`)
- Use the `default` filter to handle missing values gracefully (e.g. `{{ variable | default('n/a') }}`)
- If your template contains conflicting jinja2 syntax, wrap that section with `{% raw %}` and `{% endraw %}`
- Test your templates with various roles and collections to ensure they handle all scenarios
- Document your template structure to help maintain consistency across projects

---

## Template Inclusion (Coming Soon)

Support jinja2 `include` statements so you can reuse template blocks (e.g. headers, footers, common sections) across multiple templates. Stay tuned for updates.

---

Docsible’s templating feature gives you full control over your final documentation output. Whether you're aligning with internal standards or creating public-facing docs, custom jinja2 templates let you tailor every detail.

[← Back to Home](../index.md)
