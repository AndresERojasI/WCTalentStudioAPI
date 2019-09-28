import ExamplesService from '../../services/examples.service';
import checkAuth from '../../../common/chechAuth';
import chechAuth from '../../../common/chechAuth';

export class Controller {
  all(req, res) {
    ExamplesService.all()
      .then(r => res.json(r));
  }

  byId(req, res) {
    ExamplesService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    console.log(chechAuth(req));
    if(chechAuth(req) === false) {
      res.status(403).end();
      return false;
    }

    ExamplesService
      .create(req.body.name)
      .then(r => res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r));
  }
}
export default new Controller();
