const request = require('supertest');
const { app, server } = require('../../server');



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


describe('Class API', () => {
    let class_;
    let token;

    // get token
    beforeAll(async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'admin',
                password: 'admin'
            });
        token = res.body.token;
    });

    it('should create a new class and corresponding teacher', async () => {
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

        let teacher;

        const res_teacher = await request(app)
            .get('/api/teachers/email')
            .set('Authorization', token)
            .send({
                email: 'teacher@mail.com'
            });
        expect(res_teacher.statusCode).toEqual(200);
        teacher = res_teacher.body.id;

        const res_class = await request(app)
            .post('/api/classes')
            .set('Authorization', token)
            .send({
                name: 'class',
                teacher_id: teacher
            });
        expect(res_class.statusCode).toEqual(200);
        expect(res_class.body).toHaveProperty('id');
        class_ = res_class.body;
    }
    );

    it('should add a student to a class', async () => {
        const res = await request(app)
            .post('/api/students')
            .set('Authorization', token)
            .send({
                name: 'student',
                email: 'student_class@mail.com',
                grade: 10,
                locker: 101
            });
        expect(res.statusCode).toEqual(200);

        let student;

        const res_student = await request(app)
            .get('/api/students/email')
            .set('Authorization', token)
            .send({
                email: 'student_class@mail.com'
            });
        expect(res_student.statusCode).toEqual(200);
        student = res_student.body.id;

        const res_class = await request(app)
            .post('/api/classes/student')
            .set('Authorization', token)
            .send([{
                class_id: class_.id,
                student_id: student
            }]);
        expect(res_class.statusCode).toEqual(200);
        expect(res_class.body).toHaveProperty('message');

        const res_count = await request(app)
            .get(`/api/classes/count/${class_.id}`)
            .set('Authorization', token);
        expect(res_count.statusCode).toEqual(200);
        expect(res_count.body.student_count).toEqual(1);

        //delete student
        const res_student_del = await request(app)
            .delete(`/api/students/${student}`)
            .set('Authorization', token);
        expect(res_student_del.statusCode).toEqual(200);
        expect(res_student_del.body).toHaveProperty('message');

        const res_count_del = await request(app)
            .get(`/api/classes/count/${class_.id}`)
            .set('Authorization', token);
        expect(res_count_del.statusCode).toEqual(200);
        expect(res_count_del.body.student_count).toEqual(0);


    }
    );

    it('should add a tutorial to a class', async () => {
        const res = await request(app)
            .post('/api/authors')
            .set('Authorization', token)
            .send({
                name: 'author',
                email: 'author@mail.com',
                active: true
            });
        expect(res.statusCode).toEqual(200);

        let author;

        const res_author = await request(app)
            .get('/api/authors/email')
            .set('Authorization', token)
            .send({
                email: 'author@mail.com'
            });
        expect(res_author.statusCode).toEqual(200);
        author = res_author.body.id;

        let tutorial;

        const res_tutorial = await request(app)
            .post('/api/tutorials')
            .set('Authorization', token)
            .send({
                title: 'tutorial',
                description: 'description',
                published: true,
                author_id: author
            });
        expect(res_tutorial.statusCode).toEqual(200);
        tutorial = res_tutorial.body.id;

        const res_class = await request(app)
            .post('/api/classes/tutorial')
            .set('Authorization', token)
            .send([{
                class_id: class_.id,
                tutorial_id: tutorial
            }]);
        expect(res_class.statusCode).toEqual(200);
        expect(res_class.body).toHaveProperty('message');

        const res_count = await request(app)
            .get(`/api/classes/count/${class_.id}`)
            .set('Authorization', token);
        expect(res_count.statusCode).toEqual(200);
        expect(res_count.body.tutorial_count).toEqual(1);

        //delete tutorial
        const res_tutorial_del = await request(app)
            .delete(`/api/tutorials/${tutorial}`)
            .set('Authorization', token);
        expect(res_tutorial_del.statusCode).toEqual(200);
        expect(res_tutorial_del.body).toHaveProperty('message');

        const res_count_del = await request(app)
            .get(`/api/classes/count/${class_.id}`)
            .set('Authorization', token);
        expect(res_count_del.statusCode).toEqual(200);
        expect(res_count_del.body.tutorial_count).toEqual(0);

    }
    );

    it('should get all classes with condition', async () => {
        const res = await request(app)
            .get('/api/classes')
            .set('Authorization', token)
            .send({
                name: 'class'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBeGreaterThan(0);
        }
        );
        
        it('should get all classes', async () => {
        const res = await request(app)
            .get('/api/classes')
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        }
        );
    
    it('should update a class', async () => {
        const res = await request(app)
            .put(`/api/classes/${class_.id}`)
            .set('Authorization', token)
            .send({
                name: "class_updated",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');

        const updatedClass = await request(app)
            .get(`/api/classes/${class_.id}`)
            .set('Authorization', token);
        expect(updatedClass.statusCode).toEqual(200);
        expect(updatedClass.body.name).toEqual("class_updated");
    }
    );

    it('should change teacher of a class', async () => {
        const res = await request(app)
            .post('/api/teachers')
            .set('Authorization', token)
            .send({
                name: 'teacher',
                email: 'teacher2@mail.com',
                office: 'office 101',
                type_of_employment: 'full-time'
            });
        expect(res.statusCode).toEqual(200);

        let teacher;

        const res_teacher = await request(app)
            .get('/api/teachers/email')
            .set('Authorization', token)
            .send({
                email: 'teacher2@mail.com'
            });
        expect(res_teacher.statusCode).toEqual(200);
        teacher = res_teacher.body.id;

        const res_class = await request(app)
            .put('/api/classes/teacher')
            .set('Authorization', token)
            .send({
                class_id: class_.id,
                teacher_id: teacher
            });
        expect(res_class.statusCode).toEqual(200);
        expect(res_class.body).toHaveProperty('message');

        const updatedClass = await request(app)
            .get(`/api/classes/${class_.id}`)
            .set('Authorization', token);
        expect(updatedClass.statusCode).toEqual(200);
        expect(updatedClass.body.teacher_id).toEqual(teacher);

        //delete teacher
        const res_teacher_del = await request(app)
            .delete(`/api/teachers/${teacher}`)
            .set('Authorization', token);
        expect(res_teacher_del.statusCode).toEqual(200);
        expect(res_teacher_del.body).toHaveProperty('message');
    }
    );

    it('should delete a class and corresponding teacher', async () => {
        const res = await request(app)
            .delete(`/api/classes/${class_.id}`)
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');

        const res_teacher = await request(app)
            .delete(`/api/teachers/${class_.teacher_id}`)
            .set('Authorization', token);
        expect(res_teacher.statusCode).toEqual(200);
        expect(res_teacher.body).toHaveProperty('message');
    }

    );

    //add, del student/tutorial ide
    // delete class ide



});

// kill server 
afterAll(done => {
    if (server)
        server.close(done);
});