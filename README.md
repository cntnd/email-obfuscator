# email-obfuscator

deobfuscates obfuscated emails in html pages. searches for html tags with the `.email` class attribute and then generates a `a` tag with a mailto href:

```html
  <span class="email">email [at] domain [dot] tld</span>
```
will be rendered the following:

```html
  <a class="email" href="mailto:email@domain.tld">email@domain.tld</a>
```

you can also deobfuscate obfuscated emails (Important: no whitespaces in obfuscated email) in text blocks. You need to indicate a css selector, in the example below this would be `.selector`:

```javascript
    $(document).ready(function() {
        deobfuscateInText(".selector");
    });
    
    // or without jquery
    
    document.addEventListener("DOMContentLoaded", function (event) {
        deobfuscateInText(".selector");
    });
```
html:
```html
    <div class="selector">
        <b>Lorem ipsum dolor sit amet</b>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor name[at]domain[dot]tld invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo Name.Surname[at]mail[DOT]com dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est test[at]test[dot]ch Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    </div>
```
will be rendered the following:

```html
    <div class="selector">
        <b>Lorem ipsum dolor sit amet</b>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor <a class="email" href="mailto:name@domain.tld">name@domain.tld</a> invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo <a class="email" href="mailto:Name.Surname@mail.com">Name.Surname@mail.com</a> dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est <a class="email" href="mailto:test@test.ch">test@test.ch</a> Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    </div>
```

## examples

```html
  <span class="email" data-display="Name Surname" data-class-replace="own-email-class">name [at] domain [dot] tld</span>
  
  <span class="email test-class1 test-class2">test [At] test[Dot]ch</span>
  
  <span class="email" data-subject="test subject" data-body="test body1">info [AT]company [dot]de</span>
  
  <span class="email" data-body="test body2">Name.Surname[at]mail[DOT]com</span>
```

generates:

```html
  <a class="own-email-class" href="mailto:name@domain.tld">Name Surname</a>
  
  <a class="email test-class1 test-class2" href="mailto:test@test.ch">test@test.ch</a>
  
  <a class="email" href="mailto:info@company.de?subject=test subject?body=test body1">info@company.de</a>
  
  <a class="email" href="mailto:Name.Surname@mail.com?body=test body2">Name.Surname@mail.com</a>
```

## options

the following options are available:

* `data-display`: instead of the email shows this value as display
* `data-class-replace`: replaces all class attributes with the value
* `data-subject`: email subject
* `data-body`: email body
* `data-cc`: cc email
* `data-bcc`: bcc email

## attributes

all css class attributes will be rendered also the `.email` class, except you're using the `data-class-replace` option, then all classes will be replaced
