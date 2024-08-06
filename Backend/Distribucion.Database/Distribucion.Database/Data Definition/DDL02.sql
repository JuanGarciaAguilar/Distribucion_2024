ALTER TABLE [dbo].[tblOperacion] ADD  CONSTRAINT [DF_tblOperacion_FechaOperacion]  DEFAULT (getutcdate()) FOR [FechaOperacion]
GO
ALTER TABLE [dbo].[tblOperacion]  WITH CHECK ADD  CONSTRAINT [FK_tblOperacion_tblCliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[tblCliente] ([IdCliente])
GO
ALTER TABLE [dbo].[tblOperacion] CHECK CONSTRAINT [FK_tblOperacion_tblCliente]
GO
ALTER TABLE [dbo].[tblOperacion]  WITH CHECK ADD  CONSTRAINT [FK_tblOperacion_tblCompraDiaria] FOREIGN KEY([IdCompraDiaria])
REFERENCES [dbo].[tblCompraDiaria] ([IdCompraDiaria])
GO
ALTER TABLE [dbo].[tblOperacion] CHECK CONSTRAINT [FK_tblOperacion_tblCompraDiaria]