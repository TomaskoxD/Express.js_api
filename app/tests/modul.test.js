const request = require('supertest');
const app = require('../../server');



describe('User API', () => {
    let user;

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'user',
                email: 'user2@mail.com',
                password: 'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'user2@mail.com',
                password: 'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should find user by email', async () => {
        const res = await request(app)
            .get('/api/users/email')
            .set('Authorization', token)
            .send({
                email: 'user2@mail.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        user = res.body;
    });

    it('should delete a user', async () => {
        const res = await request(app)
            .delete(`/api/users/${user.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

});

describe('Student API', () => {
    let student;
    let token;

    // get token
    beforeAll(async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'admin',
                password: 'admin'
            });
        console.log(res.body, "tuuuuuuuuuuuuuuuuuuuuu");
        token = res.body.token;
    });


    it('should create a new student', async () => {
        const res = await request(app)
            .post('/api/students')
            .set('Authorization', token)
            .send({
                name: 'student',
                email: 'student@mail.com',
                grade: 10,
                locker: 101
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        console.log(res.body, "res.body");
    }
    );

    it('should find student by email', async () => {
        const res = await request(app)
            .get('/api/students/email')
            .set('Authorization', token)
            .send({
                email: 'student@mail.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        student = res.body;
    }
    );

    it('should get all students', async () => {
        const res = await request(app)
            .get('/api/students')
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    }
    );

    it('should update a student', async () => {
        console.log(student.id, "student.id");
        const res = await request(app)
            .put(`/api/students/${student.id}`)
            .set('Authorization', token)
            .send({
                grade: 11,
                locker: 102
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');

        const updatedStudent = await request(app)
            .get(`/api/students/${student.id}`)
            .set('Authorization', token);
        expect(updatedStudent.statusCode).toEqual(200);
        expect(updatedStudent.body.grade).toEqual(11);
        expect(updatedStudent.body.locker).toEqual("102");
    }
    );

    it('should delete a student', async () => {
        const res = await request(app)
            .delete(`/api/students/${student.id}`)
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

}
);


describe('Author API', () => {
    let author;
    let token;

    // get token
    beforeAll(async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'admin',
                password: 'admin'
            });
        console.log(res.body, "tuuuuuuuuuuuuuuuuuuuuu");
        token = res.body.token;
    });


    it('should create a new author', async () => {
        const res = await request(app)
            .post('/api/authors')
            .set('Authorization', token)
            .send({
                name: 'author',
                email: 'author@mail.com',
                active: true
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        console.log(res.body, "res.body");
    }
    );

    it('should find author by email', async () => {
        const res = await request(app)
            .get('/api/authors/email')
            .set('Authorization', token)
            .send({
                email: 'author@mail.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        author = res.body;
    }
    );

    it('should get all authors', async () => {
        const res = await request(app)
            .get('/api/authors')
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    }
    );

    it('should update a author', async () => {
        console.log(author.id, "author.id");
        const res = await request(app)
            .put(`/api/authors/${author.id}`)
            .set('Authorization', token)
            .send({
                name: "name_updated",
                active: false
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');

        const updatedAuthor = await request(app)
            .get(`/api/authors/${author.id}`)
            .set('Authorization', token);
        expect(updatedAuthor.statusCode).toEqual(200);
        expect(updatedAuthor.body.name).toEqual("name_updated");
        expect(updatedAuthor.body.active).toEqual(0);
    }
    );

    it('should delete a author', async () => {
        const res = await request(app)
            .delete(`/api/authors/${author.id}`)
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

}
);


describe('Teacher API', () => {
    let teacher;
    let token;

    // get token
    beforeAll(async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'admin',
                password: 'admin'
            });
        console.log(res.body, "tuuuuuuuuuuuuuuuuuuuuu");
        token = res.body.token;
    });


    it('should create a new teacher', async () => {
        const res = await request(app)
            .post('/api/teachers')
            .set('Authorization', token)
            .send({
                name: 'teacher',
                email: 'teacher@mail.com',
                office: 'office 101',
                type_of_employment: 'full-time'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        console.log(res.body, "res.body");
    }
    );

    it('should find teacher by email', async () => {
        const res = await request(app)
            .get('/api/teachers/email')
            .set('Authorization', token)
            .send({
                email: 'teacher@mail.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        teacher = res.body;
    }
    );

    it('should get all teachers', async () => {
        const res = await request(app)
            .get('/api/teachers')
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    }
    );

    it('should update a teacher', async () => {
        console.log(teacher.id, "teacher.id");
        const res = await request(app)
            .put(`/api/teachers/${teacher.id}`)
            .set('Authorization', token)
            .send({
                office: "office 102"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');

        const updatedTeacher = await request(app)
            .get(`/api/teachers/${teacher.id}`)
            .set('Authorization', token);
        expect(updatedTeacher.statusCode).toEqual(200);
        expect(updatedTeacher.body.office).toEqual("office 102");
    }
    );

    it('should delete a teacher', async () => {
        const res = await request(app)
            .delete(`/api/teachers/${teacher.id}`)
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

}
);
