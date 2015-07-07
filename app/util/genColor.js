var colors = ['#E74C3C', '#C0392B', '#1ABC9C',
    '#16A085', '#2ECC71', '#27AE60', '#3498DB',
    '#2980B9', '#9B59B6', '#8E44AD', '#34495E',
    '#2C3E50', '#F1C40F', '#F39C12', '#E67E22',
    '#D35400', '#95A5A6', '#7F8C8D'];


function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

module.exports = function () {
    return colors[getRandomNum(0, colors.length - 1)];
};