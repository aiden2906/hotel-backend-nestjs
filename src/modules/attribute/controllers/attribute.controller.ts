/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AttributeOptionUpdateDto } from '../dtos/attribute-option.dto';
import {
  AddAttributeOptionDto,
  AttributeCreateDto,
  AttributeUpdateDto,
  RemoveAttributeOptionDto,
} from '../dtos/attribute.dto';
import { AttributeOptionService } from '../services/attribute-option.service';
import { AttributeService } from '../services/attribute.service';

@Controller('api.attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(@Body() args: AttributeCreateDto) {
    return this.attributeService.create(args);
  }

  @Put(':id')
  async update(
    @Body() args: AttributeUpdateDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.attributeService.update(id, args);
  }

  @Put(':id/add-attribute-option')
  async addAttributeOption(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: AddAttributeOptionDto,
  ) {
    return this.attributeService.addAttributeOption(id, args);
  }

  @Put(':id/remove-attribute-option')
  async removeAttributeOption(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: RemoveAttributeOptionDto,
  ) {
    return this.attributeService.removeAttributeOption(id, args);
  }

  @Get()
  async list(@Query() query) {
    return this.attributeService.list(query);
  }

  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number) {
    return this.attributeService.get(id);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.attributeService.delete(id);
  }
}

@Controller('api.attribute-option')
export class AttributeOptionController {
  constructor(
    private readonly attributeOptionService: AttributeOptionService,
  ) {}

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: AttributeOptionUpdateDto,
  ) {
    return this.attributeOptionService.update(id, args);
  }
}
