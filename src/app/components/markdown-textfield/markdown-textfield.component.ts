/**
 * MarkdownTextfieldComponent: A component providing an interface for editing Markdown text.
 *
 * This component includes a text input field for writing in Markdown format, 
 * as well as an Emoji Mart for adding emojis to the text. It emits the 
 * compiled HTML equivalent of the entered Markdown text.
 *
 * Inputs:
 * - titleLabel: The title to display above the text input field.
 *
 * Outputs:
 * - newMdText: The Markdown text input, emitted 
 *   whenever the text input changes.
 */
import { Renderer2, Component, ElementRef, VERSION, ViewChild, HostListener, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-markdown-textfield',
  templateUrl: './markdown-textfield.component.html',
  styleUrls: ['./markdown-textfield.component.css']
})

export class MarkdownTextfieldComponent {
  @Input() titleLabel!: string;
  @Input() value!: string;
  @Output() newMdText = new EventEmitter<{ht: string}>();
  // Elements viewed in the html
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('mdComponent', { read: ElementRef }) mdComponent!: ElementRef;
  @ViewChild('emojiWrapper', { static: false }) emojiMartWrapper!: ElementRef;

  angularVersion = VERSION.full;
  ngxMarkdownVersion = '16.0.0';
  showEmojiPicker: boolean = false;
  totalFrequentLines: number = 2;
  markdown: string = '';

  // For observing changes
  markdownChange: BehaviorSubject<string> = new BehaviorSubject(this.markdown);
  private mutationObserver!: MutationObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Close the emoji picker whenever there is a click outside it
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(!this.emojiMartWrapper.nativeElement.contains(e.target)){
         this.showEmojiPicker=false;
     }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['value'] && changes['value'].currentValue !== changes['value'].previousValue) {
      this.markdown = changes['value'].currentValue;
      this.markdownChange.next(this.markdown);
    }
  }  
  
  // For listening to and emitting changes in the inputted markdown  
  ngAfterViewInit() {
    this.renderer.listen(this.textarea.nativeElement, 'input', (event: any) => {
      this.markdown = event.target.value;
      this.markdownChange.next(this.markdown);
    });
  
    this.mutationObserver = new MutationObserver((mutations) => {
      let newMd = this.mdComponent.nativeElement.innerHTML;
      newMd = newMd.replace(/\n/g, ''); // Removing "\n" from the string
      this.newMdText.emit({ ht: this.markdown }); // emit new html
    });
  
    this.mutationObserver.observe(this.mdComponent.nativeElement, {
      attributes: false, 
      childList: true, 
      characterData: true,
      subtree:true
    });
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
  }

  /**
   * Used to toggle the emoji picker on/off
   */
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  /**
   * insertEmoji inserts an emoji at selected location.
   * @param event event which contains the selected emoji
   */
  insertEmoji(event: EmojiEvent) {
    const textarea = this.textarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Insert the selected emoji into the markdown string at the cursor position
    this.markdown = this.markdown.slice(0, start) + event.emoji.native + this.markdown.slice(end);
    this.markdownChange.next(this.markdown);

    // Waits until next tick to retain selection 
    setTimeout(() => {
      // Move the cursor to after the inserted emoji
      if(event.emoji.native) {
        const newCursorPosition = start + event.emoji.native.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  }

  makeBold() {
    this.surroundText('**');
  }

  makeItalic() {
    this.surroundText('*');
  }

  /**
   * surroundText adds the inputted string to each end of the selected text in the textarea.
   * @param surroundWith string to surround text with
   */
  private surroundText(surroundWith: string) {
    const textarea = this.textarea.nativeElement;
    // Get start and end from the selected text
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    // Get selected text
    const selectedText = this.markdown.substring(start, end);

    // Checks if there is a space at the beginning of the selected text, if so compensate start
    if (selectedText.charAt(0) === ' ') {
      start = start + 1;
    }
    // Checks if there is a space at the end of the selected text, if so compensate end
    if (selectedText.charAt(selectedText.length - 1) === ' ') {
      end = end - 1;
    }

    const newText = this.markdown.slice(0, start) + surroundWith + selectedText.trim() + surroundWith + this.markdown.slice(end);
    this.markdown = newText;
    this.markdownChange.next(this.markdown);

    // Waits until next tick to retain selection 
    setTimeout(() => {
      // Apply string to each end of the selected area
      textarea.focus();
      const newStart = start + surroundWith.length;
      const newEnd = newStart + selectedText.trim().length;
      textarea.setSelectionRange(newStart, newEnd);
    });
  }
}
