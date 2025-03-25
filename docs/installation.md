---
title: Installation
template: base.html
hide:
  - navigation
---

# Installation

You can install **Docsible** in two main ways:  
via `pip` for a stable release, or from [GitHub](https://github.com/docsible/docsible) if you want the latest development version.

> Always install Docsible inside a **virtual environment** to avoid polluting your global Python packages.

---

## ✅ Recommended: Install from PyPI

This is the easiest and most stable method.

```bash
python3 -m venv venv
source venv/bin/activate
pip install docsible
```

To verify:

```bash
docsible --version
```

---

## 🛠️ Install from GitHub (Development Version)

If you want the latest features or plan to contribute:

```bash
git clone https://github.com/docsible/docsible.git
cd docsible
python3 -m venv venv
source venv/bin/activate
pip install -e .
```

To run the CLI after setup:

```bash
docsible --help
```

This installs the package in **editable mode** (`-e`), allowing you to make changes to the source and immediately test them.

---

## 🧪 Run from source without installing

If you just want to test the CLI without installing it system-wide:

```bash
git clone https://github.com/docsible/docsible.git
cd docsible
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m docsible --help
```

---

## ⛑️ Requirements

Docsible requires:

- Python 3.7+
- pip (preferably upgraded: `pip install --upgrade pip`)
- Dependencies listed in `requirements.txt`

---

## Troubleshooting

- ❌ **Command not found?**  
  Make sure your virtual environment is activated and that `docsible` is in your `$PATH`.

- ❌ **Permission denied?**  
  Never install with `sudo pip install`. Use a virtual environment instead.

---

Once installed, you’re ready to generate clean, structured documentation from your Ansible roles or collections.

[← Back to Home](index.md)
