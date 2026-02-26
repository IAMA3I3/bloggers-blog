'use client';

import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Custom Font Size Extension ───────────────────────────────────────────────
const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() {
        return { types: ['textStyle'] };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize || null,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) return {};
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (fontSize: string) =>
                    ({ chain }: any) =>
                        chain().setMark('textStyle', { fontSize }).run(),
            unsetFontSize:
                () =>
                    ({ chain }: any) =>
                        chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
        } as any;
    },
});

// ─── Icons ────────────────────────────────────────────────────────────────────
const BoldIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></svg>;
const ItalicIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>;
const UnderlineIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" y1="20" x2="20" y2="20" /></svg>;
const StrikeIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12" /><path d="M17.5 6a4 4 0 0 0-7 0c0 4 7 4 7 8a4 4 0 0 1-7 0" /></svg>;
const LinkIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
const ListIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>;
const OrderedListIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></svg>;
const QuoteIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v3.75c0 1.25.75 2.25 2 2.5.56.1 1 .606 1 1.25v1.5c0 .982-.5 1.5-2 2H3z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v3.75c0 1.25.75 2.25 2 2.5.56.1 1 .606 1 1.25v1.5c0 .982-.5 1.5-2 2h-1z" /></svg>;
const CodeIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const AlignLeftIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6" /><line x1="15" y1="12" x2="3" y2="12" /><line x1="17" y1="18" x2="3" y2="18" /></svg>;
const AlignCenterIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6" /><line x1="17" y1="12" x2="7" y2="12" /><line x1="19" y1="18" x2="5" y2="18" /></svg>;
const AlignRightIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="12" x2="9" y2="12" /><line x1="21" y1="18" x2="7" y2="18" /></svg>;
const UndoIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></svg>;
const RedoIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 14 20 9 15 4" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" /></svg>;

// ─── Toolbar Button ───────────────────────────────────────────────────────────
const ToolbarButton = ({
    onClick, active, disabled, title, children,
}: {
    onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
}) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        disabled={disabled}
        title={title}
        className={`p-1.5 rounded transition-all duration-150 ${active
            ? 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900'
            : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100'
            } ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
    >
        {children}
    </button>
);

const Divider = () => (
    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 self-center" />
);

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = [
    '#ffffff', '#9CA3AF', '#6B7280', '#374151',
    '#000000', '#EF4444', '#F97316', '#EAB308',
    '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899',
];

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px'];

// ─── Floating Bubble Toolbar ──────────────────────────────────────────────────
function FloatingBubble({ editor }: { editor: ReturnType<typeof useEditor> }) {
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editor) return;

        const update = () => {
            const { from, to } = editor.state.selection;
            if (from === to) { setPos(null); return; }

            const domSelection = window.getSelection();
            if (!domSelection || domSelection.rangeCount === 0) { setPos(null); return; }

            const range = domSelection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const editorEl = editor.view.dom.closest('.rich-editor-wrapper') as HTMLElement;
            if (!editorEl) return;

            const editorRect = editorEl.getBoundingClientRect();
            const bubbleWidth = ref.current?.offsetWidth ?? 180;

            setPos({
                top: rect.top - editorRect.top - 48,
                left: Math.min(
                    Math.max(rect.left - editorRect.left + rect.width / 2 - bubbleWidth / 2, 4),
                    editorRect.width - bubbleWidth - 4
                ),
            });
        };

        editor.on('selectionUpdate', update);
        editor.on('transaction', update);
        return () => {
            editor.off('selectionUpdate', update);
            editor.off('transaction', update);
        };
    }, [editor]);

    if (!editor || !pos) return null;

    const buttons = [
        { fn: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'B', cls: 'font-bold' },
        { fn: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'I', cls: 'italic' },
        { fn: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), label: 'U', cls: 'underline' },
        { fn: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), label: 'S', cls: 'line-through' },
    ];

    return (
        <div
            ref={ref}
            style={{ top: pos.top, left: pos.left }}
            className="absolute z-30 flex items-center gap-0.5 bg-slate-900 dark:bg-slate-100 rounded-lg shadow-xl px-2 py-1.5 pointer-events-auto"
        >
            {buttons.map(({ fn, active, label, cls }) => (
                <button
                    key={label}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); fn(); }}
                    className={`text-xs w-6 h-6 flex items-center justify-center rounded ${cls} transition-colors ${active
                        ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white'
                        : 'text-slate-300 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface RichTextEditorProps {
    initialContent?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
    error?: string
}

export default function RichTextEditor({
    initialContent = '',
    onChange,
    placeholder = 'Start writing your blog post...',
    error
}: RichTextEditorProps) {
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showFontSizes, setShowFontSizes] = useState(false);
    // Force re-render on every editor transaction so isActive() and char count stay in sync
    const [editorState, setEditorState] = useState(0);
    const [charCount, setCharCount] = useState(0);
    // Track active color independently so it persists while typing
    const [activeColor, setActiveColor] = useState<string | null>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                underline: false, // configured manually below to avoid duplicate warning
                link: false,      // configured manually below to avoid duplicate warning
            }),
            Underline,
            TextStyle.extend({
                // Keep color/font-size marks alive as the user continues typing after setting them
                keepOnSplit: true,
            }),
            Color,
            FontSize,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-blue-500 underline hover:text-blue-400 cursor-pointer' },
            }),
            Placeholder.configure({ placeholder }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[320px] px-5 py-4 text-slate-800 dark:text-slate-100',
            },
        },
        onUpdate({ editor }) {
            onChange?.(editor.getHTML());
            setCharCount(editor.getText().length);
            setEditorState(n => n + 1);
        },
        onSelectionUpdate({ editor }) {
            // Re-render toolbar when cursor moves so isActive() reflects current position
            setEditorState(n => n + 1);
            // Sync color from cursor position so toolbar reflects what's under the cursor
            const color = editor.getAttributes('textStyle').color ?? null;
            setActiveColor(color);
        },
        onTransaction() {
            setEditorState(n => n + 1);
        },
    });

    const setLink = useCallback(() => {
        if (!linkUrl) {
            editor?.chain().focus().unsetLink().run();
            setShowLinkInput(false);
            return;
        }
        const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
        editor?.chain().focus().setLink({ href: url }).run();
        setLinkUrl('');
        setShowLinkInput(false);
    }, [editor, linkUrl]);

    if (!editor) return null;

    const currentColor = activeColor || '#000000';

    // shared dropdown classes
    const dropdownClass = 'absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20';
    const dropdownItemClass = 'block w-full text-left px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300';

    return (
        <div>
            <div className="rich-editor-wrapper relative border border-slate-200 dark:border-slate-700 rounded-xl overflow-visible shadow-sm bg-white dark:bg-slate-900">

                <FloatingBubble editor={editor} />

                {/* ── Toolbar ── */}
                <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 flex flex-wrap items-center gap-0.5 rounded-t-xl">

                    {/* Heading */}
                    <select
                        className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 mr-1 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 cursor-pointer"
                        value={
                            editor.isActive('heading', { level: 1 }) ? 'h1' :
                                editor.isActive('heading', { level: 2 }) ? 'h2' :
                                    editor.isActive('heading', { level: 3 }) ? 'h3' : 'p'
                        }
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'p') editor.chain().focus().setParagraph().run();
                            else editor.chain().focus().setHeading({ level: parseInt(val[1]) as 1 | 2 | 3 }).run();
                        }}
                    >
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                    </select>

                    {/* Font size */}
                    <div className="relative mr-1">
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setShowFontSizes(!showFontSizes); setShowColorPicker(false); }}
                            className="text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1"
                        >
                            Size
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </button>
                        {showFontSizes && (
                            <div className={`${dropdownClass} py-1 min-w-22.5`}>
                                <button
                                    type="button"
                                    onMouseDown={(e) => { e.preventDefault(); (editor.chain().focus() as any).unsetFontSize().run(); setShowFontSizes(false); }}
                                    className="block w-full text-left px-3 py-1 text-xs text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700"
                                >
                                    Default
                                </button>
                                {FONT_SIZES.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onMouseDown={(e) => { e.preventDefault(); (editor.chain().focus() as any).setFontSize(size).run(); setShowFontSizes(false); }}
                                        className={dropdownItemClass}
                                        style={{ fontSize: size }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Divider />

                    {/* Formatting */}
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)"><BoldIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)"><ItalicIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)"><UnderlineIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><StrikeIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code"><CodeIcon /></ToolbarButton>

                    <Divider />

                    {/* Text color */}
                    <div className="relative">
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setShowColorPicker(!showColorPicker); setShowFontSizes(false); }}
                            title="Text color"
                            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex flex-col items-center gap-0.5"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 dark:text-slate-400">
                                <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
                            </svg>
                            <div className="w-4 h-1 rounded-full border border-slate-300 dark:border-slate-600" style={{ backgroundColor: currentColor }} />
                        </button>
                        {showColorPicker && (
                            <div className={`${dropdownClass} p-3`}>
                                <div className="grid grid-cols-4 gap-2 mb-2">
                                    {COLORS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                // setMark persists color for newly typed text; setColor alone only marks selected text
                                                editor.chain().focus().setMark('textStyle', { color }).run();
                                                setShowColorPicker(false);
                                            }}
                                            className="w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform"
                                            style={{ backgroundColor: color, borderColor: currentColor === color ? '#3B82F6' : '#e2e8f0' }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        editor.chain().focus().unsetMark('textStyle').run();
                                        setShowColorPicker(false);
                                    }}
                                    className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 w-full text-center"
                                >
                                    Reset color
                                </button>
                            </div>
                        )}
                    </div>

                    <Divider />

                    {/* Alignment */}
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left"><AlignLeftIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center"><AlignCenterIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right"><AlignRightIcon /></ToolbarButton>

                    <Divider />

                    {/* Lists & blocks */}
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list"><ListIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list"><OrderedListIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><QuoteIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block"><CodeIcon /></ToolbarButton>

                    <Divider />

                    {/* Link */}
                    <ToolbarButton
                        onClick={() => {
                            if (editor.isActive('link')) { editor.chain().focus().unsetLink().run(); }
                            else { setShowLinkInput(true); setShowColorPicker(false); setShowFontSizes(false); }
                        }}
                        active={editor.isActive('link')}
                        title="Insert link"
                    >
                        <LinkIcon />
                    </ToolbarButton>

                    <Divider />

                    {/* Undo / Redo */}
                    <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)"><UndoIcon /></ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)"><RedoIcon /></ToolbarButton>
                </div>

                {/* ── Link Input Bar ── */}
                {showLinkInput && (
                    <div className="border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-950 px-4 py-2 flex items-center gap-2">
                        <span className="text-blue-500 dark:text-blue-400"><LinkIcon /></span>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') setLink(); if (e.key === 'Escape') setShowLinkInput(false); }}
                            placeholder="https://example.com"
                            autoFocus
                            className="flex-1 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                        />
                        <button type="button" onClick={setLink} className="text-sm bg-blue-600 dark:bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">Apply</button>
                        <button type="button" onClick={() => setShowLinkInput(false)} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2">Cancel</button>
                    </div>
                )}

                {/* ── Editor Area ── */}
                <div onClick={() => editor.chain().focus().run()} className="cursor-text">
                    <EditorContent editor={editor} />
                </div>

                {/* ── Footer ── */}
                <div className="border-t border-slate-100 dark:border-slate-700 px-5 py-2 flex justify-between bg-slate-50 dark:bg-slate-800 rounded-b-xl">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{charCount} characters</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">Select text for quick formatting</span>
                </div>
            </div>
            {
                error && (
                    <p className=' text-sm font-semibold text-red-400'>{error}</p>
                )
            }
        </div>
    );
}