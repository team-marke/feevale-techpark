---
layout: technews
permalink: '/technew/{% if pagination.pageNumber > 0 %}pagina-{{ pagination.pageNumber + 2 }}/{% endif %}'
metadata:
  title: Tech News | Notícias sobre Tecnologia do Feevale Techpark
  description: Confira as notícias sobre tecnologia e inovação do Feevale Techpark! Leia matérias na íntegra e assista aos vídeos relacionados da TV Feevale!
tags:
  - navbar
eleventyNavigation:
  key: technew
  parent: home
  title: TechNews
  order: 1
pagination:
  data: collections.techNews
  size: 5
  alias: news
---