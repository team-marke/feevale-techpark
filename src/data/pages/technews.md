---
layout: technews
permalink: '/technews/{% if pagination.pageNumber > 0 %}pagina-{{ pagination.pageNumber | plus: 1 }}/{% endif %}'
metadata:
  title: Tech News | Notícias sobre Tecnologia do Feevale Techpark
  description: Confira as notícias sobre tecnologia e inovação do Feevale Techpark! Leia matérias na íntegra e assista aos vídeos relacionados da TV Feevale!
tags:
  - navbar
eleventyNavigation:
  key: techNews
  parent: home
  title: TechNews
  order: 1
pagination:
  data: collections.techNews
  size: 5
  alias: news
masthead:
  image: https://res.cloudinary.com/feevale-techpark/image/upload/v1636116851/Tecnologia_no_Feevale_Techpark.png
  title: >-
    Tech<span class="fw-bold">News</span>
  description: O espaço de notícias sobre tecnologia do Feevale Techpark.
posts:
  title: >-
    Leia <span class="text-primary">nossas notícias</span> sobre tecnologia e inovação
  decorator: https://res.cloudinary.com/feevale-techpark/image/upload/v1632244217/grafismo-unidades-01.svg
  btn_label: Leia Mais
  all_posts_url: https://www.feevale.br/acontece/noticias
videos:
  title: >-
    Vídeos do <span class="text-primary">Feevale Techpark</span>
---