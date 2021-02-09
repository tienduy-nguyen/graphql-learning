import { Exclude } from 'class-transformer';
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType('user')
@Entity('user')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field()
  @Column('text', { unique: true, nullable: false })
  @Exclude()
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column()
  @Exclude()
  password: string;
}
