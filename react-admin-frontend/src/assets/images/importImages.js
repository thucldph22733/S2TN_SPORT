function importAll(r) {
    const images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
}

const images = importAll(require.context('../../../src/assets/images', false, /\.(png|jpe?g|gif|svg)$/));

export default images;
