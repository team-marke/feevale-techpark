---js 
{
  layout: "unit",
  tags: ["navbar"],
  pagination: {
    data: "collections.units",
    size: 1,
    alias: "unit",
    addAllPagesToCollections: true,
    before(data) {
      return data.filter(entry => entry.id != "6UK2f9Ok0796d7heaLKpj7");
    } 
  },
  companies: {
    title: "<span class='text-primary'>Empresas</span> instaladas nesta unidade",
    description: "Conheça as empresas ou instituições que fazem parte do Ecossistema de Inovação do",
    btn: {
      text: "Todas as empresas",
      url: "/nossas-empresas/",
    }
  },
}
---