"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const common_1 = require("@nestjs/common");
const character_service_1 = require("./character.service");
const character_entity_1 = require("./character.entity");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
let CharacterController = class CharacterController {
    constructor(characterService) {
        this.characterService = characterService;
    }
    findAll() {
        return this.characterService.findAll();
    }
    async findCurrentUserCharacters(req) {
        const userId = req.user.id;
        return this.characterService.findAllForUser(userId);
    }
    async findOne(id, req) {
        return this.characterService.findOne(id, req.user.id);
    }
    create(characterData, req) {
        console.log('User:', req.user);
        console.log('Character Data:', characterData);
        return this.characterService.create(characterData, req.user);
    }
    update(id, character, req) {
        return this.characterService.update(id, character, req.user.id);
    }
    remove(id, req) {
        return this.characterService.remove(id, req.user.id);
    }
};
exports.CharacterController = CharacterController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all characters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of characters.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all characters for the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of characters for the current user.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "findCurrentUserCharacters", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a character by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Character found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Character not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new character' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Character created.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [character_entity_1.Character, Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing character' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Character updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, character_entity_1.Character, Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a character' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Character deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "remove", null);
exports.CharacterController = CharacterController = __decorate([
    (0, swagger_1.ApiTags)('characters'),
    (0, common_1.Controller)('characters'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [character_service_1.CharacterService])
], CharacterController);
//# sourceMappingURL=character.controller.js.map