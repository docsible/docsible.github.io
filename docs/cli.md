---
title: CLI
template: base.html
hide:
  - navigation
---

# CLI

The command line is where Docsible shines. Whether you're a fan of piping commands together like a bash wizard or just want to generate clean documentation fast, this CLI's got you covered.

No GUI. No fluff. Just instant Markdown from your existing Ansible structure.

## Quick Start

```bash
docsible --role ./roles/my_role
```

This will:

- scan your Ansible role
- parse tasks, variables, and metadata
- generate a `README.md` in the role's folder


## Common CLI Flags

| Flag            | What it does |
|-----------------|--------------|
| `--role`        | Path to your Ansible role directory |
| `--collection`  | Path to an Ansible collection directory |
| `--playbook`    | Include a playbook file (great for context and graphs) |
| `--graph`       | Adds a Mermaid diagram of the task flow |
| `--no-backup`   | Skip backing up existing README.md |
| `--no-docsible` | Don't create the `.docsible` metadata file |
| `--comments`    | Parses inline comments for doc hints |
| `--md-template` | Use your own markdown template |
| `--append`      | Append instead of overwrite the README |
| `--version`     | Show the current Docsible version |
| `--help`        | Show help and usage info |

## Real Examples

### Document a role
```bash
docsible --role ./roles/backend
```

### Role + Playbook + Graph
```bash
docsible --role ./roles/web --playbook ./site.yml --graph
```

### Full collection
```bash
docsible --collection ./collections/my_namespace/
```

### With custom template
```bash
docsible --role ./roles/api --md-template ./my_template.md
```

## What You Get

Every time you run it, Docsible produces:

- A clean `README.md`
- Tables for variables, defaults, metadata
- (Optional) Mermaid task graph
- Parsed comments (if enabled)

The output is Git-friendly, CI-friendly, and most importantly, human-friendly.

---

Docs without the pain. That's the CLI promise.

[← Back to Home](index.md)
