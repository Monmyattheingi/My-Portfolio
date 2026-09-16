(function () {
  const nativeFetch = window.fetch.bind(window);
  const demoResponse = (body, status = 200) => Promise.resolve(new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  }));

  window.fetch = async function (input, options = {}) {
    const url = String(input);
    if (url.endsWith('/api/stats')) {
      return demoResponse({ documents: 10, chunks: 1248, mode: 'portfolio-demo' });
    }
    if (url.endsWith('/api/ask')) {
      const request = JSON.parse(options.body || '{}');
      const question = request.question || 'Submitted legal scenario';
      return demoResponse({
        answerable: true,
        response_ms: 720,
        answer: 'Portfolio demo result: the system identified potentially relevant Myanmar legal provisions. In the full application, every conclusion is verified against the indexed legal corpus and returned with exact section-level sources.',
        disclaimer: 'Interactive portfolio demonstration only. The full project requires Docker, PostgreSQL, pgvector, n8n, and Ollama services. This is not legal advice.',
        analysis: {
          mode: 'portfolio_demo',
          status: 'DEMO MODE',
          classification: {
            name: 'Myanmar legal provision retrieval',
            reasoning: 'The submitted description was processed as a legal-research query: ' + question
          },
          facts: [
            { label: 'Input', value: 'Natural-language case description' },
            { label: 'Retrieval', value: 'Hybrid semantic and keyword search' },
            { label: 'Evidence policy', value: 'Exact sources required before a production answer' }
          ],
          law_summary: 'The complete system retrieves reviewed Myanmar legal sections, reranks them, and provides the law name, section, legal status, and original source.',
          recommended_actions: [
            'Review the retrieved provisions and original documents.',
            'Confirm that every cited law is current and applicable.',
            'Consult a qualified legal professional for a real matter.'
          ],
          related_sections: [
            { role: 'Demo retrieval', citation: 'Reviewed Myanmar law corpus', summary: 'The live backend supplies exact section-level citations here.' }
          ]
        },
        sources: [
          { law_name: 'Portfolio demonstration', section: 'Preview', content: 'A deployed backend displays the exact reviewed legal text and verified source URL in this area.', matched_by: 'hierarchical_semantic' }
        ]
      });
    }
    return nativeFetch(input, options);
  };
})();
