const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return all todos', (done) => {
    chai
      .request(app)
      .get('/todos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return a specific todo', (done) => {
    chai
      .request(app)
      .get('/todos/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(1);
        done();
      });
  });

  it('should update a specific todo', (done) => {
    const updatedTodo = {
      title: 'Updated Todo',
      content: 'Updated user story',
      completed: true,
    };

    chai
      .request(app)
      .put('/5')
      .send(updatedTodo)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Todo updated successfully');
        done();
      });
  });

  it('should create a new todo', (done) => {
    const newTodo = {
      title: 'New Todo',
      content: 'New user story',
      details: 'Additional details',
    };

    chai
      .request(app)
      .post('/todos')
      .send(newTodo)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal('New Todo');
        expect(res.body.content).to.equal('New user story');
        expect(res.body.details).to.equal('Additional details');
        done();
      });
  });

  it('should handle 404 error for a non-existent todo', (done) => {
    chai
      .request(app)
      .get('/todos/999')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').equal('Todo not found');
        done();
      });
  });


  it('should handle 500 error for failed todo creation', (done) => {
    const invalidTodo = {
      // Invalid todo object without required properties
    };

    chai
      .request(app)
      .post('/todos')
      .send(invalidTodo)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error').equal('Failed to create todo');
        done();
      });
  });

  it('should handle 500 error for failed todo update', (done) => {
    const invalidTodo = {
     
    };

    chai
      .request(app)
      .put('/1')
      .send(invalidTodo)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error').equal('Failed to update todo');
        done();
      });
  });
});
