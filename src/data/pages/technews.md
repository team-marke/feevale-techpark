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
  order: 6
pagination:
  data: collections.techNews
  size: 5
  alias: news
masthead:
  image: https://res.cloudinary.com/feevale-techpark/image/upload/v1636116851/Tecnologia_no_Feevale_Techpark.png
  title: >-
    TechNews
  description: Nesse espaço, você encontra as principais notícias sobre inovação e tecnologia sobre o Ecossistema do Feevale Techpark.
posts:
  title: >-
    Saiba o que está rolando em nosso <span class="text-primary">ecossistema</span>
  decorator: https://res.cloudinary.com/feevale-techpark/image/upload/v1632244217/grafismo-unidades-01.svg
  btn_label: Leia Mais
  all_posts_url: https://www.feevale.br/acontece/noticias
videos:
  title: >-
    Vídeos
  btn:
    url: 'https://www.youtube.com/c/FeevalePlay'
    text: Todos os vídeos
---