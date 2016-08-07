const assert = require('assert');
const proxyFluentApi = require('./');

// An example of the fluent API with a URL builder:
function urlBuilder(domain) {
  return proxyFluentApi((parts) => `${domain}${parts.join('/')}`);
}
const google = urlBuilder('https://google.com/');
const github = urlBuilder('https://github.com/');
assert.equal(google.search.products.bacon.and.eggs(), 'https://google.com/search/products/bacon/and/eggs');
assert.equal(google.mail.inbox(), 'https://google.com/mail/inbox');
assert.equal(github.keithamus['proxy-fluent-api'](), 'https://github.com/keithamus/proxy-fluent-api');

// An example of the fluent API using a DOM style tree-traversal
function treeTraverserExample(tree) {
  return proxyFluentApi((parts) => {
    let node = tree; // start the node at the root
    for (part of parts) {
      if (!node.props || !node.props.children || node.props.children.length === 0) {
        throw new Error(`Node ${node.tagName} has no more children`);
      }
      // If the part is a child tag, drill down into that child for the next traversal step
      let index = node.props.children.findIndex((child) => child.tagName == part);
      if(index === -1) {
        throw new Error(`Cannot find child: ${part} in ${node.tagName}`);
      }
      node = node.props.children[index];
    }
    return node.props;
  })
}
var myDomIsh = treeTraverserExample({
  tagName: 'body',
  props: {
    children: [
      {
        tagName: 'div',
        props: {
          className: 'main',
          children: [
            {
              tagName: 'span',
              props: {
                className: 'extra',
                children: [
                  { tagName: 'i', props: { textContent: 'Hello' } },
                  { tagName: 'b', props: { textContent: 'World' } },
                ]
              }
            }
          ]
        }
      }
    ]
  }
});
assert.equal(myDomIsh.div().className, 'main');
assert.equal(myDomIsh.div.span().className, 'extra');
assert.equal(myDomIsh.div.span.i().textContent, 'Hello');
assert.equal(myDomIsh.div.span.b().textContent, 'World');

console.log('All Pass :)')
