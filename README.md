# CodingWithCalvin/GHA-JBMarketplacePublisher

Github Action to publish your JetBrains plugin to the marketplace

## Usage

You can use the JB Marketplace Publish GitHub Action by configuring a YAML-based workflow file, e.g. .github/workflows/deploy.yml.

```yml
steps:
  - name: Checkout
    uses: actions/checkout@v2

  - name: JetBrains Marketplace Publisher
    uses: CodingWithCalvin/GHA-JBMarketplacePublisher@v1
    with:
      # REQUIRED
      marketplace-pat: ${{ secrets.jb_marketplace_pat }}
      archive-path: ./src/outputFolder/extension.zip

      # ONE OF THE FOLLOWING IS REQUIRED, BUT NOT BOTH
      plugin-id: 1000
      plugin-xml-id: "1001"

      # OPTIONAL
      channel: stable
      is-hidden: false
```

## Inputs

| Input           | Required | Description                                                                  |
| --------------- | -------- | ---------------------------------------------------------------------------- |
| marketplace-pat | Y        | Your 'Personal Access Token' to perform actions on the JetBrains Marketplace |
| archive-path    | Y        | Path to the local ZIP package you wish to publish                            |
| plugin-id       | N        | Your Plugin ID from the JetBrains Marketplace                                |
| plugin-xml-id   | N        | The unique identifier from the <id> tag of plugin.xml                        |
| channel         | N        | Channel to publish to (if omitted, defaults to "stable")                     |
| is-hidden       | N        | Make the update hidden (if omitted, defaults to false)                       |
