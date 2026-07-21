import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('./src/pages/Cliente/Cliente.jsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('./src/pages/Cliente/Cliente.css', import.meta.url), 'utf8');

const requiredSections = [
  ['header', /<header/],
  ['hero', /className="prime-hero"/],
  ['Serviços', /Serviços/],
  ['sobre', /id="sobre"/],
  ['CTA final', /CTA final/],
  ['footer', /<footer/],
];

for (const [section, matcher] of requiredSections) {
  assert.match(page, matcher, `A seção "${section}" deve estar presente na landing page.`);
}

assert.match(page, /<header/, 'A página deve usar um cabeçalho semântico.');
assert.match(page, /<main/, 'A página deve usar conteúdo principal semântico.');
assert.match(page, /<footer/, 'A página deve usar um rodapé semântico.');
assert.match(page, /https:\/\/wa\.me\/5511999999999/, 'Todos os CTAs devem usar o link fictício de WhatsApp.');
assert.match(styles, /@media \(max-width: 768px\)/, 'Os estilos devem incluir um breakpoint para telas menores.');
assert.match(styles, /#c9a35a/i, 'Os estilos devem incluir o tom dourado principal.');

console.log('Testes da landing page aprovados.');
