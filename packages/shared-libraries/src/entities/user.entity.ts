import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

@Entity({
  name: 'user',
})
export class UserEntity {
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  @IsUUID(4)
  id: number;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  @IsOptional()
  email?: string;

  @Column({ type: String, nullable: true })
  @Exclude({ toPlainOnly: true })
  @IsOptional()
  password?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  @IsOptional()
  socialId?: string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
