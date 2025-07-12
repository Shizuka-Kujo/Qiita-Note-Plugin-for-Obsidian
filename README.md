# Qiita Note Plugin for Obsidian

This Obsidian plugin enables the use of Qiita-style :::note syntax in your Markdown files, supporting info, warn, and alert types. It renders these notes as stylish blocks in the preview mode with Font Awesome icons. The plugin also applies a Qiita-inspired design to the entire preview (slightly customized to the author's taste). For further preview customization, you can override the plugin's CSS with your own CSS snippets.

_Note: The note blocks and quote marks use Font Awesome via CDN, so icons will not display in offline environments._

## Features

- Supports :::note info, :::note warn, and :::note alert syntax.
- Applies a Qiita-inspired CSS design to the entire preview.
- Uses Font Awesome icons (via CDN) for quotes and note blocks.

## Installation

1. **Manual Installation**:
    - Download the latest release from the GitHub repository.
    - Copy main.js, manifest.json, and styles.css to your vault's plugin directory: your-vault/.obsidian/plugins/qiita-note-plugin/.
    - Enable the plugin in Obsidian's Settings > Community Plugins.
2. **Via Obsidian Settings**:
    - Search for "Qiita Note Plugin" in Community Plugins.
    - Install and enable the plugin.

## Usage

In your Markdown files, use the following syntax:

```markdown
:::note info
This is an info note.
:::

:::note warn
This is a warning note.
:::

:::note alert
This is an alert note.
:::
```

The plugin will render these as styled blocks with icons in the preview mode.

![Note](https://raw.githubusercontent.com/Shizuka-Kujo/Qiita-Note-Plugin-for-Obsidian/main/screenshots/screenshot_note.png)

## License

This plugin is licensed under the MIT License. See the LICENSE file for details.

This plugin uses **Font Awesome 6 Free** icons, licensed under the CC BY 4.0 License, with fonts under the SIL OFL 1.1 License. Fonts are loaded via CDN (https://cdnjs.cloudflare.com). For more information, visit: Font Awesome License.

## Author

- GitHub: Shizuka-Kujo
- X: @CosmoCurious

---

## 日本語説明

### Qiita Note Plugin for Obsidianとは

- Obsidianで、Qiitaの:::note構文を利用可能にするプラグインです。info、warn、alertの3種類をサポートします。インストールするだけで、エディタに:::note構文を書くとプレビュー画面でQiita風のデザインでプレビューされます。 あとついでに全体的にQiitaっぽいスタイルになります（完全一致ではなくやや作者の好み）
- プレビューのスタイルをカスタマイズされたい場合は、当プラグインのCSSを上書きする形でCSSスニペットの適用などをお願いいたします。

※ noteブロックや引用マークにはCDNのFont Awesomeを使用していますので、オフライン環境ではアイコンが表示されません。

### 機能

- :::note info、:::note warn、:::note alertの構文に対応。
- プレビューを全体的にQiitaっぽいCSSデザインに。
- CDNのFont Awesomeで引用マークとnoteのアイコンを表示。

### インストール方法

1. **手動インストール**：
    - GitHubリポジトリから最新版をダウンロード。
    - main.js、manifest.json、styles.cssをVaultのプラグインフォルダ（your-vault/.obsidian/plugins/qiita-note-plugin/）にコピー。
    - Obsidianの設定 > コミュニティプラグインで有効化。
2. **Obsidian設定画面からインストール**：
    - コミュニティプラグインで「Qiita Note Plugin」を検索。
    - プラグインをインストールして有効化。

### 使い方

Markdownファイルに以下のように記述：

```markdown
:::note info
これは情報ノートです。
:::

:::note warn
これは警告ノートです。
:::

:::note alert
これはアラートノートです。
:::
```

プレビュー画面で、アイコン付きのスタイルが自動で表示されます。

![ノート](https://raw.githubusercontent.com/Shizuka-Kujo/Qiita-Note-Plugin-for-Obsidian/main/screenshots/screenshot_note.png)

### ライセンス

MITライセンスで公開。詳細はLICENSEを参照。

**Font Awesome 6 Free**アイコンを使用しており、CC BY 4.0ライセンス（アイコン）、SIL OFL 1.1ライセンス（フォント）に基づきます。フォントはCDN（https://cdnjs.cloudflare.com）から読み込み。詳細はFont Awesomeライセンスを確認してください。

### 作者

- GitHub：Shizuka-Kujo
- X：@CosmoCurious