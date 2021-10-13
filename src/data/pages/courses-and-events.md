---
layout: blog
permalink: '/cursos-e-eventos/{% if pagination.pageNumber > 0 %}pagina-{{ pagination.pageNumber + 2 }}/{% endif %}'
metadata:
  title: Lorem ipsum
  description: Lorem ipsum
eleventyNavigation:
  key: coursesAndEvents
  parent: home
  title: Cursos e Eventos
  order: 1
pagination:
  data: collections.coursesAndEvents
  size: 5
  alias: items
---