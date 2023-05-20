import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-markdown-textfield',
  templateUrl: './markdown-textfield.component.html',
  styleUrls: ['./markdown-textfield.component.css']
})
export class MarkdownTextfieldComponent {
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
}
