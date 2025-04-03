import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('links')
export class LinkEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', name: 'original_url'})
    originalUrl: string;

    @Column({type: 'varchar', name: 'short_code'})
    shortCode: string;
}
