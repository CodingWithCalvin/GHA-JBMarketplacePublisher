# JetBrains Marketplace Publisher

[![Build](https://img.shields.io/github/actions/workflow/status/CodingWithCalvin/GHA-JBMarketplacePublisher/build.yml?style=for-the-badge&label=Build)](https://github.com/CodingWithCalvin/GHA-JBMarketplacePublisher/actions/workflows/build.yml)
[![GitHub release](https://img.shields.io/github/v/release/CodingWithCalvin/GHA-JBMarketplacePublisher?style=for-the-badge)](https://github.com/CodingWithCalvin/GHA-JBMarketplacePublisher/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

🚀 Publish your JetBrains plugins to the marketplace with ease!

This GitHub Action publishes your JetBrains plugin (ZIP archive) to the
JetBrains Marketplace.

## 🚀 Usage

You can use the JetBrains Marketplace Publisher GitHub Action by configuring a
YAML-based workflow file, e.g. `.github/workflows/deploy.yml`.

## 📥 Inputs

| Input             | Required | Description                                              |
| ----------------- | -------- | -------------------------------------------------------- |
| `marketplace-pat` | Yes      | Your Personal Access Token for the JetBrains Marketplace |
| `archive-path`    | Yes      | Path to the local ZIP package to publish                 |
| `plugin-id`       | No\*     | Plugin ID from the JetBrains Marketplace URL             |
| `plugin-xml-id`   | No\*     | Unique identifier from the `<id>` tag in plugin.xml      |
| `channel`         | No       | Channel to publish to (default: `stable`)                |
| `is-hidden`       | No       | Make the update hidden after approval (default: `false`) |

> ⚠️ **Note:** One of `plugin-id` or `plugin-xml-id` is required, but not both.

## 📋 Example

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - name: JetBrains Marketplace Publisher
    uses: CodingWithCalvin/GHA-JBMarketplacePublisher@v1
    with:
      # REQUIRED
      marketplace-pat: ${{ secrets.JB_MARKETPLACE_PAT }}
      archive-path: './src/outputFolder/plugin.zip'

      # ONE OF THE FOLLOWING IS REQUIRED
      plugin-id: 1000
      # OR
      plugin-xml-id: 'com.example.myplugin'

      # OPTIONAL
      channel: stable
      is-hidden: false
```

## 👥 Contributors

<!-- readme: contributors -start -->
[![CalvinAllen](https://avatars.githubusercontent.com/u/41448698?v=4&s=64)](https://github.com/CalvinAllen) 
<!-- readme: contributors -end -->

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ by Coding With Calvin
