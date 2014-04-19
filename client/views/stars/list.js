var starsData = [
    {url: "http://example.com", name: "Star 1", language: "Javascript"},
    {url: "http://example2.com", name: "Star 2", language: "Javascript"},
    {url: "http://example3.com", name: "Star 3", language: "Clojure"}
];

Template.starsList.helpers({
    stars: function() {
        return Stars.find();
    }
});
