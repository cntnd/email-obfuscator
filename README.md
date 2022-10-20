# email-obfuscator

obfuscates emails in html pages. searches for html tags with the `.email` class attribute and then generates a `a` tag with a mailto href:

```html
  <span class="email">email [at] domain [dot] tld</span>
```
will be rendered the follwing:

```html
  <a class="email" href="mailto:email@domain.tld">email@domain.tld</a>
```

## examples

```html
  <span class="email" data-display="Thomas D'Ascoli" data-class-replace="own-email-class">thomas [at] dasco [dot] li</span>
  
  <span class="email test-class1 test-class2">test [At] test[Dot]ch</span>
  
  <span class="email" data-subject="test subject" data-body="test body1">fam [AT]dasco [dot]li</span>
  
  <span class="email" data-body="test body2">Thomas.DAscoli[at]gmail[DOT]com</span>
```

generates:

```html
  <a class="own-email-class" href="mailto:thomas@dasco.li">Thomas D'Ascoli</a>
  
  <a class="email test-class1 test-class2" href="mailto:test@test.ch">test@test.ch</a>
  
  <a class="email" href="mailto:fam@dasco.li?subject=test subject?body=test body1">fam@dasco.li</a>
  
  <a class="email" href="mailto:Thomas.DAscoli@gmail.com?body=test body2">Thomas.DAscoli@gmail.com</a>
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
