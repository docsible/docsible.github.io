---
title: Build
template: base.html
hide:
  - navigation
---

# Build

## 1. Install Requirements

We recommend using a virtual environment for a clean workspace:

```bash
python3 -m venv venv
source venv/bin/activate
pip install ansible docsible
```

Check that both tools are available:

```bash
ansible --version
docsible --version
```

---

## 2. Create a New Role

Use the Ansible CLI to generate a skeleton role:

```bash
ansible-galaxy init my_sample_role
```

This will create a directory structure like:

```
my_sample_role/
├── defaults/main.yml
├── handlers/main.yml
├── meta/main.yml
├── tasks/main.yml
├── vars/main.yml
└── README.md
```

You can now edit `defaults/main.yml`, `vars/main.yml`, and `tasks/main.yml` to include real logic and comments.

---

## 3. Generate Documentation with Docsible

Run Docsible to scan your role and create a `README.md` file:

```bash
docsible --role ./my_sample_role
```

If you want to include a playbook and generate a Mermaid diagram:

```bash
docsible --role ./my_sample_role --playbook ./site.yml --graph
```

---

## 4. Verify the Output

After running Docsible, your `my_sample_role/README.md` will be overwritten or created with:

- A title and metadata block
- Tables for variables (defaults + vars)
- A list of tasks
- Any comments you wrote as annotations
- Optionally, Mermaid diagrams for role and playbook flows

---

## 5. Automate It (Optional)

To regenerate docs during CI/CD or development, add a script:

```bash
#!/bin/bash
docsible --role ./my_sample_role --graph --comments --no-backup
```

Or include it in `Makefile`, GitHub Actions, or any pipeline you use.

## 6. Github workflow

```yml
name: Generate Documentation

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate_docs:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.8'

      - name: Install Docsible
        run: |
          pip install git+https://github.com/docsible/docsible.git

      - name: Generate documentation for role
        run: |
          docsible -r ./ -g -o README.md -com -nob

      - name: Check for documentation changes
        env:
          TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          if git diff --cached --exit-code; then
            echo "No changes to commit";
          else
            git commit -m "Automated documentation update by GitHub Actions"
            git push "https://${TOKEN}@github.com/docsible/thermo-core.git" HEAD:main
          fi
```

## 7. Gitlab CI
```yml
# .gitlab-ci.yml
stages:
  - generate_docs

variables:
  # Define paths to simplify the CI script
  VENV_PATH: "/home/gitlab/venv"

generate_docs:
  stage: generate_docs
  script:
    # Ensure Python and pip are installed, and create a virtual environment
    - sudo apt update && sudo apt install -y python3 python3-pip
    - python3 -m venv $VENV_PATH
    - source $VENV_PATH/bin/activate
    - pip install git+https://github.com/docsible/docsible.git

    # Generate documentation
    - docsible -r ./ -g -o README.md -com -nob

    # Check for any changes in the generated documentation
    - git config user.name "gitlab-ci"
    - git config user.email "gitlab-ci@mydomain.com"
    - git add README.md
    - if git diff --cached --exit-code; then
        echo "No changes to commit";
        exit 0;
      fi

    # Commit and push if there are changes
    - echo "Git Remote URL - http://${CI_SERVER_HOST}/${CI_PROJECT_PATH}.git"
    - git commit -m "Automated documentation update by GitLab CI"
    - git push "http://${DEPLOY_TOKEN_USER}:${DEPLOY_TOKEN}@${CI_SERVER_HOST}/${CI_PROJECT_PATH}.git" HEAD:main
  only:
    - main # Run this job only on pushes to the main branch
```


---

## Next Steps

You can now explore:

- Writing inline comments to enrich the generated docs
- Using custom templates with `--md-template`
- Documenting collections as well as individual roles

Documentation is no longer a chore. It's just one command away.

[← Back to Home](index.md)
