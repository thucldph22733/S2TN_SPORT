function importAll(r) {
    const images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
}

const images = importAll(require.context('D:/DoAnTotNghiep/S2TN_SPORT/react-admin-frontend/src/assets/images', false, /\.(png|jpe?g|gif|svg)$/));

export default images;
