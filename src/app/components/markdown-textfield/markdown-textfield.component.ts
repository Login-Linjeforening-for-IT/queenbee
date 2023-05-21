import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'app-markdown-textfield',
  templateUrl: './markdown-textfield.component.html',
  styleUrls: ['./markdown-textfield.component.css']
})
export class MarkdownTextfieldComponent {
  @ViewChild('textarea')
  textarea!: ElementRef;
  angularVersion = VERSION.full;
  ngxMarkdownVersion = '16.0.0';

  markdown = `## Markdown **rulez**!
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

  makeBold() {
    this.surroundText('**');
  }

  makeItalic() {
    this.surroundText('*');
  }

  surroundText(surroundWith: string) {
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

    // Retain selection
    setTimeout(() => {
      textarea.focus();
      const newStart = start + surroundWith.length;
      const newEnd = newStart + selectedText.trim().length;
      textarea.setSelectionRange(newStart, newEnd);
    });
  }
}
