# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]: ShopEase
  - paragraph [ref=e4]: Create your account
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]: Full Name
      - textbox "Full Name" [active] [ref=e8]:
        - /placeholder: John Doe
    - generic [ref=e9]:
      - generic [ref=e10]: Email
      - textbox "Email" [ref=e11]:
        - /placeholder: you@email.com
        - text: test@gmail.com
    - generic [ref=e12]:
      - generic [ref=e13]: Password (min 6 chars)
      - textbox "Password (min 6 chars)" [ref=e14]:
        - /placeholder: ••••••
        - text: Password123
    - button "Create Account" [ref=e15] [cursor=pointer]
  - generic [ref=e16]:
    - text: Already have an account?
    - link "Sign in" [ref=e17] [cursor=pointer]:
      - /url: /login.html
```