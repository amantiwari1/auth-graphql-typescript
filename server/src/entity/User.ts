import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;
  @Field()
  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;
}
