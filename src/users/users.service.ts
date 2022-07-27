import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './user.entity'
import { ifError } from 'assert';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>) {
    }

    create(email:string, password:string){
        //create instance of user
        const user= this.repo.create({email,password})
        // save in db
        return this.repo.save(user)
    }

    findOne(id: number) {
        return this.repo.findOneBy({id});
      }
    
      find(email: any) {
        return this.repo.findBy({ email });
      }
    

    async update(id:number,attrs: Partial<User>) {
        const user = await this.findOne(id)
        if(!user){
            throw new Error('user not found');
        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }

    remove(){}
}
