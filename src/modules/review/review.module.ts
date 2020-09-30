import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewController, TagController } from "./controllers/review.controller";
import { Review } from "./models/review.entity";
import { Tag } from "./models/tag.entity";
import { ReviewRepository } from "./repositories/review.repository";
import { TagRepository } from "./repositories/tag.repository";
import { ReviewService, TagService } from "./services/review.service";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Tag, ReviewRepository, TagRepository])],
  controllers: [ReviewController, TagController],
  providers: [ReviewService, TagService],
  exports: [ReviewService, TagService],
})
export class ReviewModule {}