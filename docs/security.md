---
title: Security
template: base.html
hide:
  - navigation
---

# Security

Docsible is an open-source project provided as-is, without commercial backing. That means security starts with **you**, the user.

While Docsible itself performs only local file parsing and Markdown generation, it's still important to follow best practices when installing, using, and contributing to it or any open-source CLI tool.

## Package Provenance

Only install Docsible from **trusted sources**:

- ✅ PyPI - via `pip install docsible`
- ✅ [GitHub](https://github.com/docsible/docsible) - official codebase

🚫 Never install Docsible (or any Python package) from unknown domains, shady repositories, or files shared on forums and private links.

If your organization provides an **internal proxy or package analyzer**, use it to inspect and validate packages before installing them. These tools can help detect supply chain attacks or unexpected dependencies.

## Installation Best Practices

- Use a **virtual environment** to isolate dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install docsible
```

- Pin versions using `requirements.txt` or tools like `pip-tools`
- Check PyPI release signatures or GitHub commit signatures if available

## PIP Security Tips

- Upgrade pip regularly: `pip install --upgrade pip`
- Use `pip install --require-hashes` to ensure package integrity
- Prefer wheels over source builds when possible
- Enable pip's dependency resolver warnings to avoid insecure or conflicting packages

## GitHub Safety

- Always clone from the [official GitHub repo](https://github.com/docsible/docsible)
- Avoid running scripts or commands from unverified forks or anonymous gists
- Review pull requests and issues carefully before using them in CI/CD

## Using in CI/CD

If you integrate Docsible into automated pipelines:

- Validate all inputs, especially if Docsible is run in shared or dynamic environments
- Avoid exposing secrets in YAML or Markdown files (Docsible doesn't decrypt values but reads variable names)
- Pin the exact Docsible version used in production pipelines to avoid surprises

## Reporting Security Concerns

Docsible is a local command-line tool, it doesn't run a server, open ports, or reach out to external systems. But like any software that interacts with your files, it's worth keeping secure.

If you spot a bug or unexpected behavior that could lead to unintended access, manipulation of data, or other security risks:

- **Open a GitHub issue** and label it with `security`.  
- If the issue is sensitive, keep it minimal or private. You can reach out directly using the contact info in the repository.

Docsible has no telemetry, no network activity, and doesn't touch external systems, so most risks are limited to file handling and data parsing. That said, we're always happy to fix things fast if you find them.


## Final Advice

- Trust but verify - open-source empowers, but also requires vigilance
- Use internal scanning or mirroring tools if your company provides them
- Never run Docsible with `sudo` or elevated privileges it's not necessary

---

Stay safe. Stick to the basics. And never trust a random `.tar.gz`.

[← Back to Home](index.md)