import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
      };

      const result = service.create(createTodoDto);

      expect(result).toEqual({
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should create a todo with minimal data', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Minimal Todo',
      };

      const result = service.create(createTodoDto);

      expect(result).toEqual({
        id: expect.any(Number),
        title: 'Minimal Todo',
        description: null,
        completed: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should return empty array initially', () => {
      expect(service.findAll()).toEqual([]);
    });

    it('should return all todos', () => {
      service.create({ title: 'Todo 1' });
      service.create({ title: 'Todo 2' });

      const result = service.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Todo 1');
      expect(result[1].title).toBe('Todo 2');
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', () => {
      const created = service.create({ title: 'Test Todo' });
      const result = service.findOne(created.id);

      expect(result).toEqual(created);
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a todo', () => {
      const created = service.create({ title: 'Original Title' });
      const updateDto: UpdateTodoDto = {
        title: 'Updated Title',
        completed: true,
      };

      const result = service.update(created.id, updateDto);

      expect(result.title).toBe('Updated Title');
      expect(result.completed).toBe(true);
      expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(created.updatedAt.getTime());
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.update(999, { title: 'Updated' })).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a todo', () => {
      const created = service.create({ title: 'To be deleted' });

      expect(() => service.remove(created.id)).not.toThrow();
      expect(() => service.findOne(created.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
