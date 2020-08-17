---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<section id="main" class="wrapper style1">
  <header class="major">
      <h2>Posts</h2>
  </header>
  {% for e in site.external_feed %}
    <h2>{{ e.title }}</h2>
    <p>{{ e.feed_content }}</p>
  {% endfor %}
<section class="special">
  <ul class="actions">
  <li><a href="{{ site.baseurl }}{{ e.url }}" class="button {% cycle '', 'alt'%}">Read More</a></li>
  </ul>
</section>
