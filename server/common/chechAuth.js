export default req => {
    return req.session.token || false;
}