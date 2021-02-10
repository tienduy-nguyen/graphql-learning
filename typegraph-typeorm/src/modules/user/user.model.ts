import { Exclude } from 'class-transformer';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType('user')
@Entity('user')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text', { unique: true, nullable: false })
  @Exclude()
  username: string;

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

  @Field()
  fullName(@Root() parent: User): string {
    const { firstName, lastName } = parent;
    const newFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const newLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    return `${newFirstName} ${newLastName}`;
  }
}
