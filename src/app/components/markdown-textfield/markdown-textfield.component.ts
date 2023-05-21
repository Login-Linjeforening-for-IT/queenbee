import { Renderer2, Component, ElementRef, VERSION, ViewChild, HostListener } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-markdown-textfield',
  templateUrl: './markdown-textfield.component.html',
  styleUrls: ['./markdown-textfield.component.css']
})
export class MarkdownTextfieldComponent {
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('emojiWrapper', { static: false }) emojiMartWrapper!: ElementRef;

  angularVersion = VERSION.full;
  ngxMarkdownVersion = '16.0.0';
  showEmojiPicker: boolean = false;
  totalFrequentLines: number = 2;

  // Some dummy text to show basics of markdown
  markdown: string = `## Markdown **rulez**!
  Markdown er **veldig** *bra*! 😎
  <br></br>
  Værmelding for dagen: [yr.no](https://www.yr.no)
  
  ### Huskeliste
  1. Datautstyr
     - ~Datamaskin~
     - Lader
     - Mus
  2. Søvn, ikke lov å sove
  
  ## English
  Coming later!
  
  | Name   | Age | City       |
  |--------|-----|------------|
  | John   | 25  | New York   |
  | Alice  | 30  | London     |
  | Peter  | 28  | San Francisco |

`;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Close the emoji picker whenever there is a click outside it
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(!this.emojiMartWrapper.nativeElement.contains(e.target)){
         this.showEmojiPicker=false;
     }
    });
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
