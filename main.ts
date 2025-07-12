import { Plugin, MarkdownPostProcessorContext, MarkdownView } from 'obsidian';

export default class QiitaNotePlugin extends Plugin {
    async onload() {
        // styles.cssを読み込む
        this.registerDomEvent(document, 'DOMContentLoaded', () => {
            const styleSheet = document.createElement('link');
            styleSheet.rel = 'stylesheet';
            styleSheet.href = this.app.vault.adapter.getResourcePath(`${this.manifest.dir}/styles.css`);
            document.head.appendChild(styleSheet);
        });

        const processMarkdown = (element: HTMLElement, context: MarkdownPostProcessorContext) => {
            console.log('PostProcessor triggered for sourcePath:', context.sourcePath);

            const codeblocks = element.querySelectorAll('pre > code[class*="note"]:not(.processed)');
            if (codeblocks.length > 0) {
                codeblocks.forEach((codeblock: HTMLElement) => {
                    const source = codeblock.innerText;
                    const lines = source.trim().split('\n');
                    const typeMatch = lines[0].match(/^:::note\s+(\w+)/);
                    if (!typeMatch) return;

                    const type = typeMatch[1];
                    const content = lines.slice(1).join(' ');

                    const iconMap: { [key: string]: string } = {
                        info: 'fa-check-circle',
                        warn: 'fa-exclamation-circle',
                        alert: 'fa-times-circle'
                    };
                    const iconClass = iconMap[type] || 'fa-info-circle';

                    const div = document.createElement('div');
                    div.className = `note ${type}`;
                    const span = div.appendChild(document.createElement('span'));
                    span.className = `fa fa-fw ${iconClass}`;
                    const innerDiv = div.appendChild(document.createElement('div'));
                    innerDiv.appendChild(document.createElement('p')).textContent = content;

                    const pre = codeblock.parentElement;
                    if (pre) {
                        codeblock.classList.add('processed');
                        pre.replaceWith(div);
                    }
                });
            }

            const paragraphs = element.querySelectorAll('p:not(.processed)');
            let noteCount = 0;
            paragraphs.forEach((p: HTMLElement) => {
                const text = p.innerText;
                const noteMatch = text.match(/^:::note\s+(\w+)\s*([\s\S]*?)\s*:::/);
                if (noteMatch) {
                    const type = noteMatch[1];
                    const content = noteMatch[2].trim();

                    const iconMap: { [key: string]: string } = {
                        info: 'fa-check-circle',
                        warn: 'fa-exclamation-circle',
                        alert: 'fa-times-circle'
                    };
                    const iconClass = iconMap[type] || 'fa-info-circle';

                    const div = document.createElement('div');
                    div.className = `note ${type}`;
                    const span = div.appendChild(document.createElement('span'));
                    span.className = `fa fa-fw ${iconClass}`;
                    const innerDiv = div.appendChild(document.createElement('div'));
                    innerDiv.appendChild(document.createElement('p')).textContent = content;

                    p.classList.add('processed');
                    p.replaceWith(div);
                    noteCount++;
                }
            });

            if (noteCount > 0 || codeblocks.length > 0) {
                console.log(`Processed ${noteCount} notes and ${codeblocks.length} codeblocks for ${context.sourcePath}`);
            }
        };

        const observeDOM = (element: HTMLElement, context: MarkdownPostProcessorContext) => {
            if (element.dataset.processed === 'true') return;
            element.dataset.processed = 'true';

            const observer = new MutationObserver((mutations) => {
                const relevantChange = mutations.some(mutation => 
                    mutation.addedNodes.length > 0 || 
                    mutation.removedNodes.length > 0 ||
                    (mutation.target as HTMLElement).matches('p, pre, code')
                );
                if (!relevantChange) return;

                requestAnimationFrame(() => {
                    processMarkdown(element, context);
                });
            });

            observer.observe(element, { 
                childList: true, 
                subtree: true,
                characterData: true
            });

            requestAnimationFrame(() => {
                processMarkdown(element, context);
            });
        };

        this.registerEvent(
            this.app.workspace.on('file-open', (file) => {
                if (!file) return;
                const activeLeaf = this.app.workspace.activeLeaf;
                if (activeLeaf?.view.getViewType() === 'markdown') {
                    const view = activeLeaf.view as MarkdownView;
                    const element = view.containerEl.querySelector('.markdown-preview-view');
                    if (element) {
                        observeDOM(element as HTMLElement, {
                            sourcePath: file.path,
                            docId: '',
                            frontmatter: null,
                            addChild: () => {},
                            getSectionInfo: () => null
                        });
                    } else {
                        setTimeout(() => {
                            const retryElement = view.containerEl.querySelector('.markdown-preview-view');
                            if (retryElement) {
                                observeDOM(retryElement as HTMLElement, {
                                    sourcePath: file.path,
                                    docId: '',
                                    frontmatter: null,
                                    addChild: () => {},
                                    getSectionInfo: () => null
                                });
                            }
                        }, 1000);
                    }
                }
            })
        );

        this.registerEvent(
            this.app.workspace.on('editor-change', (editor, info) => {
                const activeLeaf = this.app.workspace.activeLeaf;
                if (activeLeaf?.view.getViewType() === 'markdown') {
                    const view = activeLeaf.view as MarkdownView;
                    const file = view.file;
                    if (file) {
                        const element = view.containerEl.querySelector('.markdown-preview-view');
                        if (element) {
                            requestAnimationFrame(() => {
                                processMarkdown(element as HTMLElement, {
                                    sourcePath: file.path,
                                    docId: '',
                                    frontmatter: null,
                                    addChild: () => {},
                                    getSectionInfo: () => null
                                });
                            });
                        }
                    }
                }
            })
        );

        this.registerMarkdownPostProcessor((element, context) => {
            observeDOM(element, context);
        });
    }
}