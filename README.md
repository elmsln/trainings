# Govcon 2019 Tuesday July 23rd, 2019
This is the outline for the day. This branch contains boilerplates that you can use to cross-reference or streamline the commands we'll work through the day of. If you don't want to work through all this together or get lost, the answers folder has a working finished copy of what we'll be working on and talking through the day of.

- 5 minute overview of what webcomponents are / considerations
  - 96.4% of USA government web traffic can handle web components (probably closer to 98% in reality)
  - 85% with no polyfills
  - "Trouble" areas:
    - IE 10 and below
    - Safari 9 and below
    - Weird unknown browsers
  - Ways around this
    - progressive enhancement from "Light DOM" content (PatternFly / Redhat do this)
    - limiting use of property / attribute / javascript
  - Why I don't do this
    - It's not reasonable to handle these cases
    - Treat this ~3.6% of traffic as you would users without javascript
      - ensure links that communicate the information
  - Making it work in IE11
    - show personal routine just as an example of alternative to 0 config today
    - view-source:https://btopro.com/
      - I serve 3 versions of content from my build routine
      - maximizes speed per target instead of compiling
      - <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    - Best part of open-wc tooling -- 0 config on this area!
- directions on installing tooling from open-wc

Steps / progression
- Resources
  - https://lit-element.polymer-project.org/
  - https://open-wc.org/
  - https://stackblitz.com/edit/govsummit (an example of something created)
  - https://designsystem.digital.gov/components/alert/ possible style guide pieces to implement as components
  - https://code.visualstudio.com/ -- recommended IDE
    - plugins:
      - lit-html
      - Polymer IDE (optional)
      - Polymer Snippets (optional)
      - Polymer Syntax (optional)
- Figure out how many people have nodejs setup
  - Install NodeJS -- https://nodejs.org/en/download/ version (10.16.x)
  - (from terminal)
  - `cd ~/`
  - `mkdir openwc`
  - `cd openwc`
  - `npm init @open-wc`
    - build a new project called gov-button
    - install with npm if it asks
- Figure out how many people have ddev setup
- Making our first element
  - A simple, accessible button
    - Discussion of properties a button could have
    - talk about this like an API
    - name spacing
  - gov-button iteration 1
    - properties / API:
      - title
      - link
      - target
      - rel (solve this with updated block looking at target change)
      - size (css `reflect:true` and then `:host([size="large"]` button))
    - minor css for baseline styling (padding, color)
    - label tag, button tag
    - add 6 buttons to the index page
      - Home
      - My Blog
- Revision cycle and leveraging others work
  - gov-button iteration 2
    - css flexibility:
      - css variables for color
    - slot flexibility
    - extending our API
      - adding icon support (string)
      - adding raised support (boolean)
    - mixing in other elements
      - paper-button (raised binding)
      - iron-icon (string / property binding)
  - making a
- Reusing our own work / remix
  - Making a modal element
    - npm install --save @polymer/paper-dialog
    - import
    - implement placing slot in it
    - style ::slotted(h2)
- Building a simple headless app from drupal based data
  - properties
    - url (string)
    - items (array)
  - rapidly integrate data from an open endpoint
  - https://www.elmsln.org/node.json
  - `npm install --save @polymer/iron-ajax`
  - `npm install --save @polymer/polymer`
  - `import "@polymer/iron-ajax/iron-ajax.js";`
  - Wire ajax to response
  - `console.log(e.detail.response);`
  - LitElement Way to render the items:
  ```js
  ${this.items.map(item => html`
        <li>
        <gov-button title="${item.title}" link="${item.url}" target="_blank">
            <simple-datetime format="M jS, Y" timestamp="${item.created}" unix></simple-datetime>
        </gov-button>
    </li>
        `)}
   ```

  - show alternative as to how this was done previosuly in polymer
    - import "@polymer/polymer/lib/elements/dom-repeat.js";
    - Wire this to the dom repeat
    - write polymer syntax for binding within template tag (yuck)
    - new tag, whole library pulled in, converting to json blob to send data down, all this skipped

- Building for production
  - remove polyfills from that file if we have them
  - yarn run build

- Drupal this thing
  - Download drupal
  - cd whatever
  - ddev config
    - might need to do the following:
    sudo /usr/local/bin/ddev hostname drupal-8.7.5.ddev.local 127.0.0.1 
    - open .ddev/config.yaml
      - router_http_port: "8081"
      - router_https_port: "4430"
  - "this is not the optimal way of doing this but lets just make it work"
  - copy dist folder into drupal-8.7.5 folder
  - edit core/themes/bartik/templates/page.html.twig
    - paste the integration bit from the build at the bottom
  - create site using standard template
  - guts should show up at bottom of page
  - make a new node and paste:
    - `<gov-button label="Stuff" title="Go here" link="https://google.com/"></gov-button>`

- Point to HAX camp 2019 in ___ on __ and __
- Point to talk Thursday
- https://open-wc.org
- polymer slack -- https://polymer.slack.com/join/shared_invite/enQtNTAzNzg3NjU4ODM4LTkzZGVlOGIxMmNiMjMzZDM1YzYyMzdiYTk0YjQyOWZhZTMwN2RlNjM5ZDFmZjMxZWRjMWViMDA1MjNiYWFhZWM
