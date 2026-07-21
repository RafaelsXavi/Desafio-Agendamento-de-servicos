---
name: page-builder
description: Construa landing pages, páginas institucionais e páginas de captura responsivas em projetos React com Vite. Use quando o pedido envolver criar uma página a partir de uma descrição, implementar uma página com base em print, mockup ou referência visual, ou desenvolver uma landing page ou página institucional sem necessidade de backend.
---

# Page Builder

Implemente páginas visuais em React com Vite, preservando as convenções do projeto e priorizando semântica, acessibilidade e responsividade.

## Fluxo obrigatório

1. Inspecione os arquivos existentes antes de editar: leia `package.json`, a árvore relevante do projeto, componentes, rotas, estilos, tokens, fontes e ativos.
2. Identifique o framework, a estrutura, os componentes reutilizáveis e a estratégia de estilos em uso. Preserve esses padrões.
3. Reutilize componentes, layouts, utilitários e ativos existentes antes de criar alternativas. Crie somente o que a página realmente exigir.
4. Implemente HTML semântico e acessível: ordem lógica de títulos, `main`, `header`, `nav`, `section` e `footer` quando aplicável; rótulos em campos; texto alternativo significativo; foco visível; navegação por teclado; contraste adequado.
5. Faça a página responsiva para celular, tablet e desktop. Evite larguras rígidas, conteúdo truncado, rolagem horizontal e alvos de toque pequenos.
6. Evite dependências externas desnecessárias. Não crie backend, APIs, autenticação ou persistência quando o escopo for somente uma página visual.
7. Não invente depoimentos, clientes, métricas, resultados, preços ou alegações. Quando essas informações não forem fornecidas, omita a seção ou marque o conteúdo explicitamente como placeholder.
8. Execute `npm run build` antes de concluir. Corrija erros de build relacionados ao trabalho realizado.
9. Inicie o servidor de desenvolvimento com o comando definido pelo projeto, normalmente `npm run dev`.
10. Use `@Browser` para abrir e revisar a página em execução. Examine pelo menos uma largura de celular, tablet e desktop.
11. Verifique e corrija overflow horizontal, espaçamento, hierarquia visual, contraste, estados e tamanho dos botões, foco por teclado e responsividade antes de finalizar.

## Implementação

- Traduza a descrição ou referência visual em uma hierarquia de conteúdo antes de codificar. Em referências incompletas, preserve a intenção visual sem inventar conteúdo factual.
- Use os breakpoints e convenções já existentes. Se eles não existirem, adote poucos breakpoints orientados pelo conteúdo.
- Prefira CSS e recursos já presentes no projeto. Use imagens fornecidas; não substitua ativos de marca sem autorização.
- Mantenha links, formulários e botões funcionais dentro do escopo visual. Para destinos ausentes, use um comportamento seguro e deixe a limitação clara na entrega.
- Se houver print ou referência visual, compare a implementação no navegador com a referência e ajuste estrutura, proporções, tipografia, cores e espaçamentos sem sacrificar acessibilidade.

## Entrega

Ao concluir, informe de forma objetiva:

- arquivos criados;
- arquivos modificados;
- comandos executados;
- validações realizadas, incluindo build e revisão no navegador;
- limitações e conteúdos que permanecem como placeholders.
