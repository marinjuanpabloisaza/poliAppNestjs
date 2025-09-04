"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nest_winston_1 = require("nest-winston");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entity/user.entity");
const codeResponse_1 = require("../enum/codeResponse");
let UserService = class UserService {
    userRepository;
    logger;
    constructor(userRepository, logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }
    async create(createUserDto) {
        try {
            if (!createUserDto.password) {
                return {
                    success: false,
                    code: codeResponse_1.codeResponse.PASSWORD_MISSING,
                    data: undefined,
                };
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const user = this.userRepository.create({
                ...createUserDto,
                password: hashedPassword,
            });
            const savedUser = await this.userRepository.save(user);
            return {
                success: true,
                code: 'created',
                data: savedUser,
            };
        }
        catch (error) {
            this.logger.error(error);
            return {
                success: false,
                code: codeResponse_1.codeResponse.UNEXPECTERD_ERROR,
                data: undefined,
            };
        }
    }
    async findAll() {
        try {
            const response = await this.userRepository.find();
            return {
                success: true,
                data: response
            };
        }
        catch (error) {
            this.logger.error(error);
            return {
                success: false,
                code: codeResponse_1.codeResponse.UNEXPECTERD_ERROR,
            };
        }
    }
    async login(loginDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { userName: loginDto.userName },
            });
            if (!user) {
                return { success: false, code: 'USER_NOT_FOUND', data: undefined };
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                return { success: false, code: 'INVALID_PASSWORD', data: undefined };
            }
            return { success: true, code: 'LOGIN_SUCCESS', data: user };
        }
        catch (error) {
            return { success: false, code: 'UNEXPECTED_ERROR', data: undefined };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], UserService);
//# sourceMappingURL=users.service.js.map