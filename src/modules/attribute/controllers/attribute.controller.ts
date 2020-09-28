/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { AttributeService } from "../services/attribute.service";

@Controller('api.attribute')
export class AttributeController {
  constructor( private readonly attributeService: AttributeService) {}

  @Post()
  async create(@Body() args){
    return this.attributeService.create(args);
  }

  @Put(':id')
  async update(@Body() args, @Param('id', new ParseIntPipe()) id: number) {
    return this.attributeService.update(id, args);
  }

  @Put(':id/add-attribute-option')
  async addAttributeOption(@Param('id', new ParseIntPipe()) id: number, @Body() args) {
    return this.attributeService.addAttributeOption(id, args);
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
  
}