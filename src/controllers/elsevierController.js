const listAll = (req, res, next) => {
    const request = require('request');
    const url = 'https://api.elsevier.com/content/search/sciencedirect';
    let query = req.query.query || '';
    let apiKey = req.query.apiKey || '';

    request(`${url}?query=${query}&apiKey=${apiKey}`, function (error, response, body) {
        let data = null;
        let articles = [];

        if (error || response.statusCode !== 200) {
            return {
                'status': 'ERROR',
                'error': error
            }
        }

        data = JSON.parse(body);

        if (data['search-results'] && data['search-results'].entry) {
            data['search-results'].entry.forEach((article) => {
                articles.push({
                    title: article['dc:title'],
                    creator: article['dc:creator'],
                    publicationName: article['prism:publicationName'],
                    coverDate: article['prism:coverDate'],
                    startingPage: article['prism:startingPage'],
                    endingPage: article['prism:endingPage'],
                    doi: article['prism:doi']
                });
            });
        }

        res.status(201).send({
            data: articles
        });
    });
};

module.exports = {
    listAll: listAll
}