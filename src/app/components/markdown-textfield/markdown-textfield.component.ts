import { Renderer2, Component, ElementRef, VERSION, ViewChild, HostListener, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-markdown-textfield',
  templateUrl: './markdown-textfield.component.html',
  styleUrls: ['./markdown-textfield.component.css']
})

/**
 * MarkdownTextfieldComponent: A component providing an interface for editing Markdown text.
 *
 * This component includes a text input field for writing in Markdown format,
 * as well as an Emoji Mart for adding emojis to the text. It emits the
 * written markdown text.
 *
 * @example
 * <app-markdown-textfield
 *   [placeholder]="'Description ENG'"
 *   [value]="eventForm.get('description_en')?.value"
 *   (newHtmlText)=onDescriptionEnChange($event)>
 * </app-markdown-textfield>
 */
export class MarkdownTextfieldComponent {
  @Input() placeholder!: string;
  @Input() value!: string;
  @Output() newMdText = new EventEmitter<{md: string}>();
  // Elements viewed in the html
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('mdComponent', { read: ElementRef }) mdComponent!: ElementRef;
  @ViewChild('emojiWrapper', { static: false }) emojiMartWrapper!: ElementRef;
  @ViewChild('tableWrapper', { static: false }) tableWrapper!: ElementRef;
  @ViewChild('speedpresTableWrapper', { static: false }) speedpresTableWrapper!: ElementRef;

  showEmojiPicker: boolean = false;
  totalFrequentLines: number = 2; // Lines in emojiPicker

  showTableInputs: boolean = false;
  tableRows: number = 2; // Default number of rows
  tableColumns: number = 2; // Default number of columns

  showSpeedpresTableInputs: boolean = false;
  sp_entries!: number;
  sp_starttime!: string;
  sp_length: number = 3;
  sp_pause: number = 1;

  markdown: string = '';

  // For observing changes
  markdownChange: BehaviorSubject<string> = new BehaviorSubject(this.markdown);
  private mutationObserver!: MutationObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Close the emoji picker whenever there is a click outside it
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(!this.emojiMartWrapper.nativeElement.contains(e.target)){
         this.showEmojiPicker = false;
     }
    });

    this.renderer.listen('window', 'click',(e:Event)=>{
      if(!this.tableWrapper.nativeElement.contains(e.target)){
          this.showTableInputs = false;
      }
     });

     this.renderer.listen('window', 'click',(e:Event)=>{
      if(!this.speedpresTableWrapper.nativeElement.contains(e.target)){
          this.showSpeedpresTableInputs = false;
      }
     });
  }

  // For listening to and emitting changes in the inputted markdown
  ngAfterViewInit() {
    this.markdown = this.value; // Sets initial markdown value

    this.renderer.listen(this.textarea.nativeElement, 'input', (event: any) => {
      this.markdownChange.next(this.markdown);
    });

    this.mutationObserver = new MutationObserver((mutations) => {
      this.newMdText.emit({md: this.markdown}) // Emit new markdown
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

  toggleTableMaker() {
    // Display the input fields for rows and columns on button click
    this.showTableInputs = !this.showTableInputs;
  }

  toggleSpeedpresTableMaker() {
    // Display the input fields for rows and columns on button click
    this.showSpeedpresTableInputs = !this.showSpeedpresTableInputs;
  }

  generateTable() {
    // Generate the table in markdown using the provided rows and columns
    const normalRow = `\n${'|'.padEnd(this.tableColumns*2+1, ' |')}`;
    const separatorRow = `\n${'|'.padEnd(this.tableColumns*2+1, '-|')}`

    // Create top row, plus dashed separator row
    let markdownTable = normalRow + separatorRow;

    // Add the remaining rows
    for(let i = 0; i < this.tableRows - 1; i++) {
      markdownTable += normalRow;
    }

    // Append the generated table to the current text
    this.markdown += markdownTable;

    // Hide the input fields after generating the table
    this.showTableInputs = false;
  }

  generateSpeedpresTable() {
    let markdownTable = `\n| Time | Company |\n|-|-|`;

    console.log('Initial sp_starttime:', this.sp_starttime);
    console.log('sp_entries:', this.sp_entries);

    // Parse time input to create a Date object for today's date
    const currentTime = this.sp_starttime.split(':');
    const currentDate = new Date();
    currentDate.setHours(Number(currentTime[0]));
    currentDate.setMinutes(Number(currentTime[1]));

    // Add the remaining rows
    for (let i = 0; i < this.sp_entries; i++) {
      console.log('Inside loop - sp_starttime:', currentDate);

      // Format the time to HH:mm
      const formattedTime = this.formatTime(currentDate.getHours(), currentDate.getMinutes());
      markdownTable += `\n| ${formattedTime} |  |`;

      // Calculate the next start time
      currentDate.setMinutes(currentDate.getMinutes() + (this.sp_pause + this.sp_length));

      console.log('Updated sp_starttime:', currentDate); // Logging for debugging
    }


    // Append the generated table to the current text
    this.markdown += markdownTable;

    // Hide the input fields after generating the table
    this.showTableInputs = false;
  }

  // Function to format time to HH:mm
  formatTime(hours: number, minutes: number): string {
    const formattedHours = this.padZero(hours);
    const formattedMinutes = this.padZero(minutes);
    return `${formattedHours}:${formattedMinutes}`;
  }

  // Function to add leading zero if single digit
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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
